//Components
import RenderStars from "@/components/RenderStars";

const Testimonial = () => {

    const FIRST = [
        { image: "/testimonial/female.jpg", name: "Averly Carter", job: "Marketing Specialist", rating: 5, content: "This banking app has completely transformed how I manage my finances. It's user-friendly and efficient!" },
        { image: "/testimonial/male.jpg", name: "Crosby Hayes", job: "Software Developer", rating: 4, content: "I love the instant transfer feature! It makes sending money to friends and family a breeze." },
        { image: "/testimonial/male1.jpg", name: "Ellison Blake", job: "Financial Analyst", rating: 5, content: "The budgeting tools are fantastic. They’ve really helped me keep track of my spending!" },
        { image: "/testimonial/male2.jpg", name: "Jasper Lane", job: "Creative Director", rating: 5, content: "I've never felt more secure about my online banking. The security features are top-notch!" },
        { image: "/testimonial/female1.jpg", name: "Marlowe Quinn", job: "Graphic Designer", rating: 4, content: "Setting up my account was so quick and easy. I was amazed at how fast everything was!" },
    ]

    const SECOND = [
        { image: "/testimonial/male3.jpg", name: "Blaise Mercer", job: "Business Strategist", rating: 5, content: "Banking Buddy is incredibly helpful and responsive. They always resolve my issues promptly." },
        { image: "/testimonial/female2.jpg", name: "Zara Brooks", job: "Human Resources Consultant", rating: 4, content: "I appreciate the transparency in fees. No hidden charges mean I can manage my finances with confidence." },
        { image: "/testimonial/male4.jpg", name: "Winslow Hart", job: "Project Manager", rating: 5, content: "Automated savings has changed my life! I’m saving more than I ever thought possible." },
        { image: "/testimonial/male5.jpg", name: "Tatum Reed", job: "Data Scientist", rating: 5, content: "The virtual debit card feature gives me peace of mind when shopping online. Highly recommend!" },
        { image: "/testimonial/female3.jpg", name: "Sloane Rivers", job: "Content Writer", rating: 4, content: "I can't believe how quickly I can transfer money internationally! It saves me so much time." },
    ]

    return (
        <main className="py-7 md:py-10 xl:py-14 overflow-x-hidden">
            <section className="flex items-center gap-x-2 mx-auto px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                <p>Testimonials</p>
            </section>
            <h1 className="mx-auto mt-10 max-w-[25ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-center">Real Feedback from Satisfied Customers</h1>
            <p className="mx-auto my-6 max-w-[55ch] text-neutral-600 text-sm md:text-base xl:text-lg text-center">Discover what real clients have to say about how our services have helped them achieve their goals and manage their finances effortlessly.</p>
            <section className="flex gap-x-5 animate-scroll-left">
                {SECOND.map((testimonial, index) => (
                    <main key={`scroll-left-${index}`} className="bg-[#F2F5F7] p-4 rounded-3xl w-80 shrink-0">
                        <div className="flex items-center gap-x-3">
                            <img src={testimonial.image} alt="Image" className="rounded-[50%] size-12" />
                            <div>
                                <div className="font-medium text-sm">{testimonial.name}</div>
                                <div className="text-neutral-600 text-xs">{testimonial.job}</div>
                            </div>
                        </div>
                        <p className="mt-2 text-sm">"{testimonial.content}"</p>
                        <div className="flex gap-1 mt-2"><RenderStars rating={(testimonial.rating)} /></div>
                    </main>
                ))}
            </section>
            <section className="flex gap-x-5 mt-6 animate-scroll-right">
                {FIRST.map((testimonial, index) => (
                    <main key={`scroll-right-${index}`} className="bg-[#F2F5F7] p-4 rounded-3xl w-80 shrink-0">
                        <div className="flex items-center gap-x-3">
                            <img src={testimonial.image} alt="Image" className="rounded-[50%] size-12" />
                            <div>
                                <div className="font-medium text-sm">{testimonial.name}</div>
                                <div className="text-neutral-600 text-xs">{testimonial.job}</div>
                            </div>
                        </div>
                        <p className="mt-2 text-sm">"{testimonial.content}"</p>
                        <div className="flex gap-1 mt-2"><RenderStars rating={(testimonial.rating)} /></div>
                    </main>
                ))}
            </section>
        </main>
    );
}

export default Testimonial;