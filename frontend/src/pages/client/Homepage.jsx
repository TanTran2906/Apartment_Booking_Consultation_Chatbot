import About from "../../ui/client/About";
import Hero from "../../ui/client/Hero";
import SampleReview from "../../ui/client/SampleReview";
import ServiceIntroduce from "../../ui/client/ServiceIntroduce";

function Homepage() {
    return (
        <>
            <Hero />
            <About />
            <ServiceIntroduce />
            <SampleReview />
        </>
    );
}

export default Homepage;
