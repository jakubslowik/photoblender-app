import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

import { FiTrash } from 'react-icons/fi';
import { FaSyncAlt } from 'react-icons/fa';

import { CONFIG, MIX_BLEND_MODES } from '../../config/config';

import { Button, Input, InputLabel } from '../../elements';

const LayerHeader = styled.header`
  display: flex;
  flex:1;
  justify-content: space-between;
  margin: ${theme.rhythm(-1)} ${theme.rhythm(-1)} 0 ${theme.rhythm(-1)};
  padding: ${theme.rhythm(1)} ${theme.rhythm(1)} 0 ${theme.rhythm(1)};
  //cursor: pointer;
`;

const ControlsGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
  margin-left: ${props => props.isDraggable ? `calc(${(theme.rhythm(-1))} + 5px)` : 0};
  svg{
    color: #333;
    margin-right: 5px;
    margin-top: -1px;
    transition: all 0.4s ease;
    :hover{
      transition-delay: -0.2s;
      color: #444;
      cursor: pointer;
    }
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  margin: 0 1px;
  background: #111;
  padding: ${theme.rhythm(1)};
  opacity: 1;
  border-radius: 4px;
  overflow: hidden;
  min-width: 350px;
  transform-origin: 50% 100%;
  height: 80px;
  transition: 0.2s;
  ${ControlsGroup}{
    opacity: 0;
  }
  //border: 1px solid rgba(255,255,255,0.5);
  :first-of-type{
    margin-left: 0;
  }
  :last-of-type{
    margin-right: 0;
  }
  :hover{
    height: auto;
    ${ControlsGroup}{
      opacity: 1;
    }
  }
`;


const LayerControlsTitle = styled.h3`
  font-size: 1rem;
  font-family: GilroyBold;
  color: #f5f5f5;
  align-self: flex-start;
`;


const RangeInput = ({ value, type, config, handleControlsOnWheel, handleControlsOnChange }) => {
  const { min, max, step } = config;
  return (
    <Input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onWheel={e => handleControlsOnWheel(e, type, ...config)}
      onChange={e => handleControlsOnChange(e, type)}
    />
  );
};

const Select = styled.select`
  height: 32px;
  text-transform: capitalize; 
  flex: 1; 
  background: #333; 
  color: #afafaf;
`;

const LayerControls = ({ layerName, deleteLayer, handleLayerControlsChange, getRandomBgUrl, initialValues }) => {
  const {
    blendMode: initMixBlendMode = 'overlay',
    filter: {
      'hue-rotate': initHueRotate = 0,
      saturate: initSaturate = 100,
      brightness: initBrightness = 1,
      contrast: initContrast = 1,
      blur: initBlur = 0,
      grayscale: initGrayscale = 0,
      sepia: initSepia = 0,
    } = {},
    opacity: initOpacity = 100,
  } = initialValues;

  // const [isLayerLocked, setLayerLocked] = useState(false);
  // const [isLayerPickedUp, setLayerPickedUp] = useState(false);
  // const [isFlippedX, setFlippedX] = useState(false);
  // const [isFlippedY, setFlippedY] = useState(false);

  const [imageType, setImageType] = useState('');

  const [mixBlendMode, setMixBlendMode] = useState(initMixBlendMode);
  const [bgUrlInputValue, setBgUrlInputValue] = useState('');
  const [hueRotateInputValue, setHueRotateInputValue] = useState(initHueRotate);
  const [saturateInputValue, setSaturateInputValue] = useState(initSaturate);
  const [brightnessInputValue, setBrightnessInputValue] = useState(initBrightness);
  const [contrastInputValue, setContrastInputValue] = useState(initContrast);
  const [blurInputValue, setBlurInputValue] = useState(initBlur);
  const [grayscaleInputValue, setGrayscaleInputValue] = useState(initGrayscale);
  const [sepiaInputValue, setSepiaInputValue] = useState(initSepia);
  const [opacityInputValue, setOpacityInputValue] = useState(initOpacity);

  // takes min range, max range and step of range input slider (along with speed modifier) and returns a value by which an input should increase/decrease
  const calculateOnWheelValue = (...args) => {
    const [e, { min, max, step, mouseWheelSpeed }] = args;
    console.log(mouseWheelSpeed);
    const scrollingUp = e.nativeEvent.wheelDelta > 0 ? true : false;
    const toFixed = Number.isInteger(step) ? 0 : 2;
    const newInputValue =
      scrollingUp
        ?
        Math.min(max, Number.parseFloat(e.target.value) + ((e.nativeEvent.wheelDelta / 120) * step * mouseWheelSpeed)).toFixed(toFixed)
        :
        Math.max(min, Number.parseFloat(e.target.value) + ((e.nativeEvent.wheelDelta / 120) * step * mouseWheelSpeed)).toFixed(toFixed);
    return newInputValue;
  };

  const handleControlsOnWheel = (...args) => {
    const [e, type, ...restArgs] = args; //rest args contain: min, max, step and mouseWheelSpeed
    const newInputValue = calculateOnWheelValue(e, ...restArgs);
    switch (type) {
      case 'mixBlendMode':
        setMixBlendMode(e.target.value);
        handleLayerControlsChange(layerName, { mixBlendMode: `${e.target.value}` });
        break;
      case 'hueRotate':
        setHueRotateInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `hue-rotate(${e.target.value}deg)` });
        break;
      case 'saturate':
        setSaturateInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `saturate(${e.target.value}%)` });
        break;
      case 'brightness':
        setBrightnessInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `brightness(${e.target.value})` });
        break;
      case 'contrast':
        setContrastInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `contrast(${e.target.value})` });
        break;
      case 'blur':
        setBlurInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `blur(${e.target.value}px)` });
        break;
      case 'sepia':
        setSepiaInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `sepia(${e.target.value}%)` });
        break;
      case 'grayscale':
        setGrayscaleInputValue(newInputValue);
        handleLayerControlsChange(layerName, { filter: `grayscale(${e.target.value}%)` });
        break;
      case 'opacity':
        setOpacityInputValue(newInputValue);
        handleLayerControlsChange(layerName, { opacity: `${e.target.value / 100}` });
        break;
      default:
        break;
    }
  };

  const handleControlsOnChange = (e, type) => {
    switch (type) {
      case 'mixBlendMode':
        setMixBlendMode(e.target.value);
        handleLayerControlsChange(layerName, { mixBlendMode: `${e.target.value}` });
        break;
      case 'hueRotate':
        setHueRotateInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `hue-rotate(${e.target.value}deg)` });
        break;
      case 'saturate':
        setSaturateInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `saturate(${e.target.value}%)` });
        break;
      case 'brightness':
        setBrightnessInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `brightness(${e.target.value})` });
        break;
      case 'contrast':
        setContrastInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `contrast(${e.target.value})` });
        break;
      case 'blur':
        setBlurInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `blur(${e.target.value}px)` });
        break;
      case 'sepia':
        setSepiaInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `sepia(${e.target.value}%)` });
        break;
      case 'grayscale':
        setGrayscaleInputValue(e.target.value);
        handleLayerControlsChange(layerName, { filter: `grayscale(${e.target.value}%)` });
        break;
      case 'opacity':
        setOpacityInputValue(e.target.value);
        handleLayerControlsChange(layerName, { opacity: `${e.target.value / 100}` });
        break;
      default:
        break;
    }
  };

  const handleMixBlendModeOnWheel = (e) => {
    const scrollingUp = e.nativeEvent.wheelDelta > 0 ? true : false;  //TODO does not work in firefox!?
    const activeMixBlendModeIndex = MIX_BLEND_MODES.indexOf(mixBlendMode);
    const newMixBlendModeIndex =
      scrollingUp
        ?
        Math.max(0, activeMixBlendModeIndex - 1)
        :
        Math.min(MIX_BLEND_MODES.length - 1, activeMixBlendModeIndex + 1);

    const newMixBlendMode = MIX_BLEND_MODES[newMixBlendModeIndex];
    setMixBlendMode(newMixBlendMode);
    handleLayerControlsChange(layerName, { mixBlendMode: `${newMixBlendMode}` });
  };

  return (
    <StyledWrapper style={{ background: `linear-gradient(0deg,rgba(255,0,150,0.3))` }}>
      <LayerHeader>
        <LayerControlsTitle>{layerName}</LayerControlsTitle>
      </LayerHeader>
      <ControlsGroup>
        <InputLabel>Blend Mode</InputLabel>
        <Select
          value={mixBlendMode}
          onWheel={e => handleMixBlendModeOnWheel(e)}
          onChange={e => handleControlsOnChange(e, 'mixBlendMode')}
        >
          {MIX_BLEND_MODES.map((blendMode, i) => {
            return (
              <option value={blendMode} key={i}>{blendMode.replace('-', ' ')}</option>
            );
          })}
        </Select>
      </ControlsGroup>
      <ControlsGroup>
        <Input
          style={{ marginRight: '3px' }}
          type="text"
          placeholder="https://bg_url..."
          value={bgUrlInputValue}
          onChange={(e) => setBgUrlInputValue(e.target.value)}
        />
        <Button
          style={{ marginBottom: 0 }}
          type="button"
          onClick={() => handleLayerControlsChange(layerName, { background: `url(${bgUrlInputValue})` })}
        >
          Set
        </Button>
      </ControlsGroup>
      <ControlsGroup>
        <InputLabel>Image type</InputLabel>
        <Input
          type="text"
          placeholder="cat, abstract, texture..."
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Hue-rotate ({hueRotateInputValue})</InputLabel>
        <RangeInput
          value={hueRotateInputValue}
          type='hueRotate'
          config={CONFIG.hueRotate}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Saturate ({saturateInputValue})</InputLabel>
        <RangeInput
          value={saturateInputValue}
          type='saturate'
          config={CONFIG.saturate}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Brightness ({brightnessInputValue})</InputLabel>
        <RangeInput
          value={brightnessInputValue}
          type='brightness'
          config={CONFIG.brightness}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Contrast ({contrastInputValue})</InputLabel>
        <RangeInput
          value={contrastInputValue}
          type='contrast'
          config={CONFIG.contrast}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Blur ({blurInputValue}<span style={{ textTransform: 'lowercase' }}>px</span>)</InputLabel>
        <RangeInput
          value={blurInputValue}
          type='blur'
          config={CONFIG.blur}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Grayscale ({grayscaleInputValue}%)</InputLabel>
        <RangeInput
          value={grayscaleInputValue}
          type='grayscale'
          config={CONFIG.grayscale}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Sepia ({sepiaInputValue})</InputLabel>
        <RangeInput
          value={sepiaInputValue}
          type='sepia'
          config={CONFIG.sepia}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup style={{ marginBottom: '1rem' }}>
        {/*<FiAlignJustify/>*/}
        <InputLabel>Opacity ({opacityInputValue}%)</InputLabel>
        <RangeInput
          value={opacityInputValue}
          type='opacity'
          config={CONFIG.opacity}
          handleControlsOnWheel={handleControlsOnWheel}
          handleControlsOnChange={handleControlsOnChange}
        />
      </ControlsGroup>
      <ControlsGroup>
        <Button
          type="button"
          withIcon
          onClick={() => {
            const randomBgUrl = getRandomBgUrl(imageType);
            setBgUrlInputValue(randomBgUrl);
            handleLayerControlsChange(layerName, { background: `url(${randomBgUrl})` });
          }}>
          REPLACE <FaSyncAlt/>
        </Button>
        <Button
          type="button"
          withIcon
          onClick={() => deleteLayer(layerName)}>
          DELETE <FiTrash/>
        </Button>
        {/*<Button type="button"*/}
        {/*withIcon*/}
        {/*isActive={isLayerLocked}*/}
        {/*onClick={() => setLayerLocked(state => !state)}>*/}
        {/*{isLayerLocked ? 'LOCKED ' : 'LOCK '}*/}
        {/*{isLayerLocked ? <FiLock/> : <FiUnlock/>}*/}
        {/*</Button>*/}
      </ControlsGroup>
      <ControlsGroup>
        {/*<Button type="button"*/}
        {/*isActive={isFlippedX}*/}
        {/*onClick={() => {*/}
        {/*setFlippedX(state => !state);*/}
        {/*handleLayerControlsChange(layerName, { transform: `scaleX(${isFlippedX ? '-1' : '1'})` });*/}
        {/*}}>*/}
        {/*FLIP-X*/}
        {/*</Button>*/}
        {/*<Button type="button"*/}
        {/*isActive={isFlippedY}*/}
        {/*onClick={() => {*/}
        {/*setFlippedY(state => !state);*/}
        {/*handleLayerControlsChange(layerName, { transform: `scaleY(${isFlippedY ? '-1' : '1'})` });*/}
        {/*}}>*/}
        {/*FLIP-Y*/}
        {/*</Button>*/}
      </ControlsGroup>
    </StyledWrapper>
  );
};


export default LayerControls;