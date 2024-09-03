import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import Controls from './Controllers';
import Actions from './Actions';

const images = [
  "https://png.pngtree.com/element_our/20190529/ourmid/pngtree-cartoon-orange-irregular-shape-image_1193256.jpg",
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNhdHxlbnwwfHx8fDE2MzY3MjQ5NjA&ixlib=rb-1.2.1&q=80&w=400',
  "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvam9iNTU3LW5hdHRoYS0wMi5wbmc.png",
  "https://img.freepik.com/free-vector/orange-banner-design-white-background_1308-91929.jpg?semt=ais_hybrid"
];

const Canvas = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const layerRef = useRef(null);
  const transformerRef = useRef(null);
  const [text, setText] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const videoElement = document.createElement('video');
    videoElement.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
    videoElement.crossOrigin = 'anonymous';
    videoElement.loop = true;
    videoElement.muted = true;

    videoRef.current = videoElement;

    const stage = new Konva.Stage({
      container: containerRef.current,
      width: 700,
      height: 400,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    layerRef.current = layer;

    const konvaImage = new Konva.Image({
      x: 50,
      y: 50,
      width: 700,
      height: 400,
      image: videoElement,
      draggable: false,
    });

    layer.add(konvaImage);
    layer.draw();

    const drawFrame = () => {
      konvaImage.cache();
      konvaImage.getLayer()?.batchDraw();
      requestAnimationFrame(drawFrame);
    };

    videoElement.addEventListener('loadeddata', () => {
      drawFrame();
    });


    const handleClickOutside = (e) => {
      if (!stage || !transformerRef.current) return;
      const isTransformer = transformerRef.current.nodes().some(node => node.hasPointerCapture(e.pointerId));
      if (!isTransformer) {
        transformerRef.current.visible(false);
        transformerRef.current.getLayer()?.batchDraw();
        setSelectedObject(null);
      }
    };

    stage.on('click', handleClickOutside);

    return () => {
      videoElement.pause();
      stage.off('click', handleClickOutside);
      stage.destroy();
    };
  }, []);

  const addImage = () => {
    if (!selectedImage) return;

    const overlayImage = new Image();
    overlayImage.src = selectedImage;
    overlayImage.onload = () => {
      const konvaOverlayImage = new Konva.Image({
        x: 100,
        y: 100,
        image: overlayImage,
        width: 150,
        height: 100,
        draggable: true,
      });

      const transformer = new Konva.Transformer({
        nodes: [konvaOverlayImage],
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 20 || newBox.height < 20) {
            return oldBox;
          }
          return newBox;
        },
        visible: false,
      });

      if (layerRef.current) {
        layerRef.current.add(konvaOverlayImage);
        layerRef.current.add(transformer);
        layerRef.current.draw();
      }

      konvaOverlayImage.on('click', (e) => {
        e.cancelBubble = true;
        if (transformerRef.current) {
          transformerRef.current.visible(false);
          transformerRef.current.getLayer()?.batchDraw();
        }

        transformer.nodes([konvaOverlayImage]);
        transformer.visible(true);
        if (transformer.getLayer()) {
          transformer.getLayer().batchDraw();
        }

        transformerRef.current = transformer;
        setSelectedObject(konvaOverlayImage);
      });
    };
  };

  const addText = () => {
    if (text.trim() === '') return;

    const konvaText = new Konva.Text({
      x: 200,
      y: 200,
      text: text,
      fontSize: 24,
      fill: 'white',
      draggable: true,
    });

    if (layerRef.current) {
      layerRef.current.add(konvaText);

      const transformer = new Konva.Transformer({
        nodes: [konvaText],
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < 20 || newBox.height < 20) {
            return oldBox;
          }
          return newBox;
        },
        visible: false,
      });

      layerRef.current.add(transformer);
      layerRef.current.draw();

      konvaText.on('click', (e) => {
        e.cancelBubble = true;
        if (transformerRef.current) {
          transformerRef.current.visible(false);
          transformerRef.current.getLayer()?.batchDraw();
        }

        transformer.nodes([konvaText]);
        transformer.visible(true);
        if (transformer.getLayer()) {
          transformer.getLayer().batchDraw();
        }

        transformerRef.current = transformer;
        setSelectedObject(konvaText);
      });
      setText("")
    }

  };

  const moveObject = (dx, dy) => {
    if (selectedObject) {
      const newX = selectedObject.x() + dx;
      const newY = selectedObject.y() + dy;
      selectedObject.position({ x: newX, y: newY });
      layerRef.current.batchDraw();
    }
  };

  return (
    <div className="flex">

      <div className="flex-1 border border-gray-300">
        <div ref={containerRef} className="w-full h-[300px] flex justify-center" />
      </div>


      <div className="w-80 p-4 flex-shrink-0 bg-gray-100">
        <Controls 
          handlePlay={() => videoRef.current?.play()}
          handlePause={() => videoRef.current?.pause()}
          addImage={addImage}
          addText={addText}
          setText={setText}
          text={text}
          images={images}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage} 
        />
        <Actions moveObject={moveObject} />
      </div>
    </div>
  );
};

export default Canvas;
