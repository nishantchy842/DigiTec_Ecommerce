import { Carousel } from 'antd';
import one from '../images/one.jpg'
import two from '../images/two.jpg'
import three from '../images/three.jpg'

const Slider = () => {
    const images = [
        one,
        two,
        three
    ]
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    return (
        <Carousel autoplay afterChange={onChange}>
            {
                images.map((item, id) => {
                    return (
                        <div key={id}>
                            <img src={item} alt='/' />
                        </div>
                    )
                })
            }

        </Carousel>
    )
}
export default Slider;