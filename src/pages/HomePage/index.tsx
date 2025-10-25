//Components
import Features from "./Features";
import Currencies from "./Currencies";
import Card from "./Card";
import SmartBanking from "./SmartBanking";
import Testimonial from "./Testimonial";
import CTA from "./CTA";

const index = () => {
    return ( 
        <main>
            <Features />
            <Currencies />
            <Card />
            <SmartBanking />
            <Testimonial />
            <CTA />
        </main>
     );
}
 
export default index;