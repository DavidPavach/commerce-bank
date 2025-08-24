import { useState, useRef, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";
import { useNavigate } from 'react-router-dom';

//Services
import { useUserKyc } from "@/services/mutations.service";

//Constants
import { ID_TYPES, GENDER_OPTIONS, MAX_FILE_SIZE } from "@/enums";

//Icons
import { CheckCircle, Upload, AlertCircle, ChevronRight, ChevronLeft, X } from "lucide-react";
import Button from "@/components/Button";


export default function Kyc() {

  // Form state
  const [step, setStep] = useState<number>(1);
  const [gender, setGender] = useState<string>("");
  const [idType, setIdType] = useState<string>("");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(null);
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  // Refs for file inputs
  const frontImageRef = useRef<HTMLInputElement>(null);
  const backImageRef = useRef<HTMLInputElement>(null);

  // Handle gender selection
  const handleGenderChange = (value: string) => {
    setGender(value)
    setErrors((prev) => ({ ...prev, gender: "" }))
  }

  // Handle ID type selection
  const handleIdTypeChange = (value: string) => {
    setIdType(value)
    setErrors((prev) => ({ ...prev, idType: "" }))
  }

  // Validate file size and type
  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 20MB limit"
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      return "Only JPG, JPEG, and PNG files are allowed"
    }

    return null
  }

  // Handle front image upload
  const handleFrontImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateFile(file)
    if (error) {
      setErrors((prev) => ({ ...prev, frontImage: error }))
      return
    }

    setFrontImage(file)
    setErrors((prev) => ({ ...prev, frontImage: "" }))

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setFrontImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Handle back image upload
  const handleBackImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateFile(file)
    if (error) {
      setErrors((prev) => ({ ...prev, backImage: error }))
      return
    }

    setBackImage(file)
    setErrors((prev) => ({ ...prev, backImage: "" }))

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setBackImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Remove front image
  const removeFrontImage = () => {
    setFrontImage(null)
    setFrontImagePreview(null)
    if (frontImageRef.current) {
      frontImageRef.current.value = ""
    }
  }

  // Remove back image
  const removeBackImage = () => {
    setBackImage(null)
    setBackImagePreview(null)
    if (backImageRef.current) {
      backImageRef.current.value = ""
    }
  }

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!gender) newErrors.gender = "Please select your gender"
      if (!idType) newErrors.idType = "Please select an ID type"
    } else if (step === 2) {
      if (!frontImage) newErrors.frontImage = "Please upload the front of your ID"
    } else if (step === 3) {
      if (!backImage) newErrors.backImage = "Please upload the back of your ID"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    setStep((prev) => prev - 1)
  }

  // Reset the form
  const resetForm = () => {
    setStep(1)
    setGender("")
    setIdType("")
    setFrontImage(null)
    setBackImage(null)
    setFrontImagePreview(null)
    setBackImagePreview(null)
    setErrors({})
    setIsSuccess(false)
  }

  // TanStack Query mutation for user kyc
  const userKyc = useUserKyc()
  const handleKyc = () => {

    if (!validateStep()) return;

    // Create form data
    const formData = new FormData()
    formData.append("gender", gender)
    formData.append("idType", idType)
    if (frontImage) formData.append("frontImage", frontImage)
    if (backImage) formData.append("backImage", backImage)

    toast("Uploading your details", { isCloseBtn: true });
    userKyc.mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message || "Your identity has been successfully verified!");
        setIsSuccess(true);
        setTimeout(() => navigate('/pin'), 500);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const message = error?.response?.data?.message || "Identity verification failed. Please review the information you submitted and try again.";
        toast.error(message, { isCloseBtn: true });
      },
    });
  }

  // Format file size
  const formatFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} B`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`
    }
  }

  return (
    <div className="mt-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-8">
        <div className="relative">
          <div className="flex bg-gray-200 mb-4 rounded h-2 overflow-hidden text-xs">
            <motion.div initial={{ width: "0%" }} animate={{ width: `${(step / 4) * 100}%` }} transition={{ duration: 0.5 }} className="flex flex-col justify-center bg-blue-600 shadow-none text-white text-center whitespace-nowrap"></motion.div>
          </div>
          <div className="flex justify-between">
            <div className={`text-sm ${step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              Personal Info
            </div>
            <div className={`text-sm ${step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}`}>Front ID</div>
            <div className={`text-sm ${step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}`}>Back ID</div>
            <div className={`text-sm ${step >= 4 ? "text-blue-600 font-medium" : "text-gray-500"}`}>Review</div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-4">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="py-12 text-center">
                <div className="flex justify-center items-center bg-green-100 mx-auto rounded-full w-16 h-16">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="mt-6 font-bold text-gray-900 text-xl md:text-2xl">Verification Submitted</h2>
                <p className="mt-2 text-gray-600">
                  Your identity verification has been submitted successfully. We will review your information and get
                  back to you shortly.
                </p>
                <p className="mt-10 text-primary text-sm md:text-base xl:text-lg">Redirecting to Transaction Pin Page...</p>
                <div className="flex justify-end mt-4">
                  <button onClick={resetForm} className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700">
                    Start New Verification
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="mb-6 font-semibold text-gray-900 text-lg md:text-xl">Personal Information</h2>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-700">Gender</label>
                      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
                        {GENDER_OPTIONS.map((option) => (
                          <button key={option.value} type="button" onClick={() => handleGenderChange(option.value)}
                            className={`relative px-4 py-3 border rounded-lg shadow-sm focus:outline-none ${gender === option.value
                              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                              : "border-gray-300 bg-white hover:bg-gray-50"
                              }`}>
                            <span className="block font-medium">{option.label}</span>
                            {gender === option.value && (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="top-2 right-2 absolute text-blue-600">
                                <CheckCircle className="w-4 h-4" />
                              </motion.span>
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.gender && <p className="mt-2 text-red-600">{errors.gender}</p>}
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-700">ID Type</label>
                      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                        {ID_TYPES.map((type) => (
                          <button key={type.value} type="button" onClick={() => handleIdTypeChange(type.value)}
                            className={`relative px-4 py-3 border rounded-lg shadow-sm focus:outline-none ${idType === type.value
                              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                              : "border-gray-300 bg-white hover:bg-gray-50"
                              }`}>
                            <span className="block font-medium">{type.label}</span>
                            {idType === type.value && (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="top-2 right-2 absolute text-blue-600">
                                <CheckCircle className="w-4 h-4" />
                              </motion.span>
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.idType && <p className="mt-2 text-red-600">{errors.idType}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="mb-2 font-semibold text-gray-900 text-lg md:text-xl">Upload Front of ID</h2>
                    <p className="mb-6 text-gray-600">
                      Please upload a clear photo of the front side of your{" "}
                      {ID_TYPES.find((t) => t.value === idType)?.label}
                    </p>

                    {frontImagePreview ? (
                      <div className="mb-6">
                        <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                          <img src={frontImagePreview || "/placeholder.svg"} alt="Front ID Preview" className="bg-gray-100 w-full h-64 object-contain" />
                          <button type="button" onClick={removeFrontImage} className="top-2 right-2 absolute bg-white hover:bg-gray-100 shadow-md p-1 rounded-full">
                            <X className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        {frontImage && (
                          <p className="mt-2 text-gray-600">
                            {frontImage.name} ({formatFileSize(frontImage.size)})
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div onClick={() => frontImageRef.current?.click()}
                          className="flex flex-col justify-center items-center hover:bg-blue-50 p-6 border-2 border-gray-300 hover:border-blue-500 border-dashed rounded-lg transition-colors cursor-pointer">
                          <Upload className="mb-2 w-10 h-10 text-gray-400" />
                          <p className="font-medium text-gray-900">Click to upload front of ID</p>
                          <p className="mt-1 text-gray-500 text-xs">PNG, JPG, JPEG up to 20MB</p>
                        </div>
                        <input ref={frontImageRef} type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleFrontImageChange} className="hidden" />
                      </div>
                    )}

                    {errors.frontImage && (
                      <div className="flex items-start gap-2 mb-4 text-red-600">
                        <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5" />
                        <p className="text-sm">{errors.frontImage}</p>
                      </div>
                    )}

                    <div className="bg-blue-50 mb-4 p-4 rounded-lg">
                      <h3 className="mb-2 font-medium text-blue-800">Tips for a good ID photo:</h3>
                      <ul className="space-y-1 pl-5 text-blue-700 list-disc">
                        <li>Make sure all corners of the ID are visible</li>
                        <li>Avoid glare or shadows on the ID</li>
                        <li>Ensure the photo is clear and not blurry</li>
                        <li>Place the ID against a dark background for better contrast</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="mb-2 font-semibold text-gray-900 text-lg md:text-xl">Upload Back of ID</h2>
                    <p className="mb-6 text-gray-600">
                      Please upload a clear photo of the back side of your{" "}
                      {ID_TYPES.find((t) => t.value === idType)?.label}
                    </p>

                    {backImagePreview ? (
                      <div className="mb-6">
                        <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                          <img src={backImagePreview || "/placeholder.svg"} alt="Back ID Preview" className="bg-gray-100 w-full h-64 object-contain" />
                          <button type="button" onClick={removeBackImage} className="top-2 right-2 absolute bg-white hover:bg-gray-100 shadow-md p-1 rounded-full">
                            <X className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        {backImage && (
                          <p className="mt-2 text-gray-600">
                            {backImage.name} ({formatFileSize(backImage.size)})
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div onClick={() => backImageRef.current?.click()}
                          className="flex flex-col justify-center items-center hover:bg-blue-50 p-6 border-2 border-gray-300 hover:border-blue-500 border-dashed rounded-lg transition-colors cursor-pointer">
                          <Upload className="mb-2 w-10 h-10 text-gray-400" />
                          <p className="font-medium text-gray-900">Click to upload back of ID</p>
                          <p className="mt-1 text-gray-500 text-xs">PNG, JPG, JPEG up to 20MB</p>
                        </div>
                        <input ref={backImageRef} type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleBackImageChange} className="hidden" />
                      </div>
                    )}

                    {errors.backImage && (
                      <div className="flex items-start gap-2 mb-4 text-red-600">
                        <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5" />
                        <p className="text-sm">{errors.backImage}</p>
                      </div>
                    )}

                    <div className="bg-blue-50 mb-4 p-4 rounded-lg">
                      <h3 className="mb-2 font-medium text-blue-800">Tips for a good ID photo:</h3>
                      <ul className="space-y-1 pl-5 text-blue-700 list-disc">
                        <li>Make sure all corners of the ID are visible</li>
                        <li>Avoid glare or shadows on the ID</li>
                        <li>Ensure the photo is clear and not blurry</li>
                        <li>Place the ID against a dark background for better contrast</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="mb-6 font-semibold text-gray-900 text-lg md:text-xl">Review Information</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="mb-2 font-medium text-gray-700">Personal Information</h3>
                        <div className="gap-4 grid grid-cols-2">
                          <div>
                            <p className="text-gray-500 text-xs">Gender</p>
                            <p className="font-medium">
                              {GENDER_OPTIONS.find((g) => g.value === gender)?.label || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">ID Type</p>
                            <p className="font-medium">
                              {ID_TYPES.find((t) => t.value === idType)?.label || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                        <div>
                          <h3 className="mb-2 font-medium text-gray-700">Front of ID</h3>
                          {frontImagePreview ? (
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                              <img
                                src={frontImagePreview || "/placeholder.svg"}
                                alt="Front ID Preview"
                                className="bg-gray-100 w-full h-40 object-contain"
                              />
                            </div>
                          ) : (
                            <div className="p-4 border border-gray-300 rounded-lg text-gray-500 text-center">
                              No image uploaded
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="mb-2 font-medium text-gray-700">Back of ID</h3>
                          {backImagePreview ? (
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                              <img
                                src={backImagePreview || "/placeholder.svg"}
                                alt="Back ID Preview"
                                className="bg-gray-100 w-full h-40 object-contain"
                              />
                            </div>
                          ) : (
                            <div className="p-4 border border-gray-300 rounded-lg text-gray-500 text-center">
                              No image uploaded
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-yellow-800">
                          By submitting this information, you confirm that all provided details are accurate and the
                          uploaded documents are valid. False information may result in account suspension.
                        </p>
                      </div>

                      {errors.submit && (
                        <div className="flex items-start gap-2 bg-red-50 p-4 rounded-lg">
                          <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5 text-red-600" />
                          <p className="text-red-600">{errors.submit}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {!isSuccess && (
          <div className="flex justify-between items-center gap-x-5 bg-gray-50 px-4 py-4 border-gray-200 border-t">
            {step > 1 ? (
              <button type="button" onClick={handlePrevious} disabled={userKyc.isPending}
                className="inline-flex items-center bg-white hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-gray-700 disabled:cursor-pointer">
                <ChevronLeft className="mr-1 w-4 h-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button type="button" onClick={handleNext} className="inline-flex items-center bg-blue-600 hover:bg-blue-700 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-white">
                Next
                <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            ) : (
              <Button onClick={handleKyc} text="Submit Verification" loadingText='Submitting....' variant='primary' size='lg' disabled={userKyc.isPending} loading={userKyc.isPending} />
            )}
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-6 text-center">
        <p className="text-neutral-600">
          Having trouble?{" "}
          <a href="/support" className="text-neutral-800 hover:text-white hover:scale-105 duration-300">
            Contact support
          </a>
        </p>
      </motion.div>
    </div>
  )
}
