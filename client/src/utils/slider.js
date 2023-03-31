import { Carousel } from 'antd';
import one from '../images/one.jpg'
import two from '../images/two.jpg'
import three from '../images/three.jpg'
import four from '../images/four.jpg'


const Slider = () => {
    const images = [
        one,
        three,
        four
    ]

    return (
        <Carousel autoplay >
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