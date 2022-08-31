import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from "react-redux";

function Slide() {
  const mobile = useSelector((state) => state.reducerSetMobile.mobile);
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ mobile ? 'https://http2.mlstatic.com/D_NQ_691837-MLA51196568743_082022-F.webp'
            : 'https://http2.mlstatic.com/D_NQ_809093-MLA51196590579_082022-OO.webp' }
          alt="slide-1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ mobile ? 'https://http2.mlstatic.com/D_NQ_851538-MLA51200355315_082022-F.webp'
            : 'https://http2.mlstatic.com/D_NQ_818417-MLA51200356270_082022-OO.webp' }
          alt="slide-2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ mobile ? 'https://http2.mlstatic.com/D_NQ_830923-MLA51182819957_082022-F.webp'
            : 'https://http2.mlstatic.com/D_NQ_659447-MLA51182948365_082022-OO.webp' }
          alt="slide-3"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ mobile ? 'https://http2.mlstatic.com/D_NQ_866061-MLA51199176833_082022-F.webp'
            : 'https://http2.mlstatic.com/D_NQ_626961-MLA51199176828_082022-OO.webp' }
          alt="slide-4"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ mobile ? 'https://http2.mlstatic.com/D_NQ_736497-MLA51179958058_082022-F.webp'
            : 'https://http2.mlstatic.com/D_NQ_944471-MLA51179958037_082022-OO.webp' }
          alt="slide-5"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slide;
