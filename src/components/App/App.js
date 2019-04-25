import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FiLayers,
  FiMove,
  FiNavigation,
  FiPlusCircle,
  FiPlusSquare,
  FiRefreshCw,
  FiRewind,
  FiRotateCw,
  FiSearch,
  FiSettings,
  FiSliders,
  FiSquare,
  FiTrash2,
} from 'react-icons/fi';

import { FaEye } from 'react-icons/fa';

import { Button } from '../../elements';

import { Layer, LayerControls } from '../../components';

import theme from '../../config/theme';

const StyledWrapper = styled.div`
  min-height: 100vh;
`;

const Artboard = styled.main`
  position: absolute;
  top: 0;
  left: 60px;
  width: calc(100% - 260px - 60px);
  height: 100%;
  display: flex;
  cursor: ${props => props.cursor}
`;

const ControlPanel = styled.div`
  display: flex;
  left: 60px;
  align-self: flex-end;
  overflow-x: auto;
  ::-webkit-scrollbar-track
  {
    background-color: rgb(27,27,27);
  }
  ::-webkit-scrollbar
  {
    height: 13px;
    background-color:  rgba(27,31,35,1);
  }  
  ::-webkit-scrollbar-thumb
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 999px;
    background-color: #6a6f77;
  }
`;

const ToolsMenu = styled.div`
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(27,31,35,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100vh;
  transition: all 0.2s ease;
  padding: ${theme.rhythm(0.5)};
`;

const ToolIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-bottom: 2px;
  color: ${props => props.isActive ? '#f5f5f5' : '#6a6f77' };
  border: ${props => props.isActive ? '1px solid rgba(0,0,0,0.25)' : '1px solid transparent' }; ;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.4s ease;
  background: ${props => props.isActive ? 'rgba(0,0,0,0.35)' : 'transparent' };
  svg{
    transition: all 0.4s ease;
  }
  :hover{
    background: ${props => props.isActive ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)' };
    transition-delay: -0.2s;
    svg{
      transition-delay: -0.2s;
      color: ${props => props.isActive ? '#eee' : '#999' };
    }
  }
  :active{ 
    svg{
     color: #6a6f77;
    }
  }
`;

const StyledSettingsIcon = styled(FiSettings)`
  user-select: none;
  cursor: pointer;
  color: #494d55;
  margin-top: auto!important;
  transition: all 0.4s ease;
  :hover{
    color: #6a6f77;
    transition-delay: -0.2s;
  }
  :active{
    color: #494d55;
  }
`;

const PanelMenu = styled.div`
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(27,31,35,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6a6f77;
  width: 260px;
  height: 100vh;
  transition: all 0.2s ease;
  z-index: 1;
  padding: ${theme.rhythm(1)} 0;
  text-align: center;
  > svg{
    font-size: 125%;
    cursor: pointer;
    transition: all 0.4s ease;
    margin: 10px 5px;
    :hover{
      transition-delay: -0.2s;
      color: #999;
    }
    :active{
      color: #f5f5f5;
    }
  }
`;

const LayerBoxes = styled.div`
  background: linear-gradient(0deg, transparent, rgba(2,4,13,0.15));
  width: 100%;
  min-height: 25%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: ${theme.rhythm(1)};
`;

const DeleteLayerButton = styled.div`
  user-select: none;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 20px;
  height: 20px;
  padding: 2px;
  :hover{
    > svg{
      color: #777;
    }
  }
  > svg {
    transition: 0.2s;
    color: #555; 
  }
`;

const LayerBox = styled.div`
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: 0.4s;
  width: 100%;
  cursor: pointer;
  padding: 2px 1rem 2px 6px;
  background: ${props => props.isActive ? 'rgba(0,0,0,0.35)' : 'transparent'};
  :hover{
    color: #999;
    transition-delay: -0.2s;
    background: rgba(0,0,0,0.25);
    ${DeleteLayerButton}{
      opacity: 1;
    }
  }
`;

const LayerBoxVisibilityCheckbox = styled.div`
  user-select: none;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 1px solid rgba(0,0,0, 0.5);
  border-radius: 4px;
  margin-right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  > svg{
    color: #777;
    font-size: 90%;
    visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  }
  :hover{
    background: rgba(0,0,0,0.35);
    > svg{
      transition: 0.2s;
      color: #999;
    }
  }
  :active{
    background: rgba(0,0,0,0.5);
    > svg{
      transition: 0.05s;
      color: #555;
    }
  }
`;

const LayerTitle = styled.div`
  font-size: 0.9rem;
`;

const PanelMenuLabel = styled.div`
  margin-top: auto;
  text-transform: uppercase;
  font-family: GilroyBold, sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.1rem;
  color: #f5f5f5;
  margin-bottom: 10px;
  svg{
    margin-bottom: -4px;
    margin-right: 2px;
    font-size: 150%;
    color: #bbb;
  }
`;

const rotateOnce = keyframes`
  from{
    filter: invert(100%)  hue-rotate(40deg);
    transform: rotateZ(0deg);
  }
  to{ 
    filter: invert(100%)  hue-rotate(180deg);
    transform: rotateZ(360deg);
  }
`;

const Logo = styled.img`
  filter: invert(50%) hue-rotate(40deg);
  transition: 0.2s;
  margin-bottom: 3rem;
  :hover{
    animation: ${rotateOnce} 0.8s cubic-bezier(.93,.29,.28,.94) forwards;
  }
`;


const ValueChangeIndicator = styled.div`
  color: #999;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;


const MINIMUM_ZOOM = 0.05;
const WHEEL_ZOOM_SPEED = 15;


const App = ({}) => {

  const [activeTool, setActiveTool] = useState('zoom');
  const [isControlsPanelVisible, setControlsPanelVisible] = useState(false);
  const [isInteractingWithArtboard, setIsInteractingWithArtboard] = useState(false);
  const [scale, setScale] = useState(0.75);
  const [rotate, setRotate] = useState(0);
  const [transformOriginX, setTransformOriginX] = useState(50);
  const [transformOriginY, setTransformOriginY] = useState(50);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isMouseDown, setMouseDown] = useState(false);
  const [isZoomingIn, setZoomingIn] = useState(true);

  const [presets, setPresets] = useState([
    {
      blendMode: 'normal',
      filter: {
        'hue-rotate': 0,
        saturate: 150,
        brightness: 1,
        contrast: 1,
        blur: 0,
        grayscale: 100,
        sepia: 0,
      },
      opacity: 100,
    },
    {
      blendMode: 'lighten',
      filter: {
        'hue-rotate': 10,
        saturate: 150,
        brightness: 1,
        contrast: 1,
        blur: 0,
        grayscale: 100,
        sepia: 0,
      },
      opacity: 75,
    },
    {
      blendMode: 'darken',
      filter: {
        'hue-rotate': -150,
        saturate: 150,
        brightness: 1,
        contrast: 1,
        blur: 0,
        grayscale: 100,
        sepia: 0,
      },
      opacity: 100,
    },
    {
      blendMode: 'overlay',
      filter: {
        'hue-rotate': 150,
        saturate: 150,
        brightness: 1,
        contrast: 1,
        blur: 0,
        grayscale: 100,
        sepia: 0,
      },
      opacity: 100,
    },
  ]);

  const getRandomBgUrl = (type = '', width = 1920, height = 1080) => {
    const typeQuery = `${type}&`;
    return `https://source.unsplash.com/random/${width}x${height}?${typeQuery}sig=${Math.floor(Math.random() * 9999999)}`;
  };

  const [layers, setLayers] = useState(
    {
      layer1: {
        bgUrl: getRandomBgUrl(),
        bgStyle: {
          mixBlendMode: 'overlay',
        },
      },
      layer2: {
        bgUrl: getRandomBgUrl(),
        bgStyle: {
          mixBlendMode: 'overlay',
        },
      },
      layer3: {
        bgUrl: getRandomBgUrl(),
        bgStyle: {
          mixBlendMode: 'overlay',
        },
      },
    },
  );

  const [layerCreationsCount, setLayerCreationsCount] = useState(Object.entries(layers).length);

  const createNewLayerData = (preset = {}) => {
    const { blendMode = 'overlay', filter = {}, ...args } = preset;
    const filterString =
      Object.keys(filter).length > 0 //if has 'filter' object has any properties
        ?
        Object.entries(filter).reduce((str, pair) => {
          const [key, value] = pair;
          return str + ` ${key}(${value})`;
        }, '')  //make string from all filters
        :
        '';
    return {
      bgUrl: getRandomBgUrl(),
      bgStyle: {
        mixBlendMode: blendMode || 'overlay',
        filter: filterString,
        opacity: args.opacity || 1,
      },
    };
  };

  const replaceAllImages = () => {
    const updatedLayers = Object.entries(layers).map(layer => {
      const [layerName, layerData] = layer;
      layerData.bgUrl = getRandomBgUrl();
      return { [layerName]: layerData };
    });

    setLayers({
      ...Object.assign(...updatedLayers),
    });
  };

  const deleteLayer = (layerName) => {
    delete layers[layerName];
    setLayers({
      ...layers,
    });
  };

  const loadPreset = () => {
    const layersFromPresetArr = presets.map((preset, i) => [`layer${i}`, createNewLayerData(preset)]);
    const layersFromPreset = {}; //we can mutate its properties
    layersFromPresetArr.map((layerFromPresetArr) => {
      const [layerName, layerData] = layerFromPresetArr;
      layersFromPreset[layerName] = layerData;
    });
    setLayers({
      ...layersFromPreset,
    });
  };

  const createNewLayer = () => {
    const newLayerName = `layer${layerCreationsCount + 1}`;
    setLayerCreationsCount(layerCreationsCount => layerCreationsCount + 1);
    setLayers({ ...layers, [`${newLayerName}`]: createNewLayerData() });
  };

  const handleLayerControlsChange = (layerName, changedStyleProperties) => {
    const chainFilters = (actualFilters, changedFilter) => {
      const actualFiltersArray = actualFilters.replace('filter:', '').split(' ');
      const actualFiltersList = Object.assign(...actualFiltersArray.map(filter => {
        const filterSliced = filter.slice(0, -1).split('(');
        return { [filterSliced[0]]: filterSliced[1] };
      }));

      const changedFilterSliced = changedFilter.replace('filter:', '').trim().slice(0, -1).split('(');
      const [changedFilterName, changedFilterValue] = changedFilterSliced;
      const updatedFiltersList = { ...actualFiltersList, [changedFilterName]: changedFilterValue };

      const chainedFilters = Object.keys(updatedFiltersList).reduce((chainedString, key) => {
        const filterName = key;
        const filterValue = updatedFiltersList[key];
        chainedString += key !== '' ? `${filterName}(${filterValue}) ` : '';
        return chainedString;
      }, ``);

      return { filter: chainedFilters };
    };

    const hasFilterChanged = changedStyleProperties.filter ? true : false;
    const hasBackgroundUrlChanged = changedStyleProperties.background ? true : false;

    const chainedStyleProperties =
      hasFilterChanged && layers[layerName].bgStyle.filter ?
        { ...chainFilters(layers[layerName].bgStyle.filter, changedStyleProperties.filter) }
        :
        changedStyleProperties;

    const updatedBackgroundUrl =
      hasBackgroundUrlChanged ?
        changedStyleProperties.background.slice(0, -1).substring('url('.length)
        :
        layers[layerName].bgUrl;
    setLayers({
      ...layers,
      [layerName]: {
        ...layers[layerName],
        bgUrl: updatedBackgroundUrl,
        bgStyle: {
          ...layers[layerName].bgStyle,
          ...chainedStyleProperties,
        },
      },
    });
  };

  //resets all transformation applied by tools
  const resetTransformations = () => {
    setRotate(0);
    setTranslateX(0);
    setTranslateY(0);
    setScale(1);
  };

  //for now its only zoom
  const handleArtboardInteractionWheel = e => {
    const newZoomValueModifier = (e.nativeEvent.wheelDelta / 12000) * WHEEL_ZOOM_SPEED;
    setScale(Math.max(MINIMUM_ZOOM, scale * (1 + newZoomValueModifier)));
  };

  //rounds the number to the nearest 5
  //used for example in rotate tool
  const round5 = x => (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;

  // handle tool "dragging", which is launched when a user clicks (mouse down) and move a mouse
  const handleArtboardInteractionClickAndMove = e => {
    switch (activeTool) {
      case 'moveArtboard':
        setTranslateX(Math.round(translateX + e.movementX));
        setTranslateY(Math.round(translateY + e.movementY));
        break;
      case 'rotate':
        const newRotate = e.shiftKey ?
          round5(rotate + e.movementX / 5) // if rotating with shift key, it "snaps" to nearest "whole" fives, eg. -5, 0, 5, 10, 15 etc
          :
          rotate + e.movementX / 10;
        const newRotateNormalized = (newRotate > 359) ? 0 : (newRotate < -359) ? 0 : newRotate; //return 0 if rotation is higher than 359 or lower than -359
        setRotate(newRotateNormalized);
        break;
      case 'zoom':
        setZoomingIn(e.movementX > 0); // e.movementX > 0 is true when we are moving mouse right
        setScale(Math.max(MINIMUM_ZOOM, scale * (1 + (e.movementX / 400)))); // scale won't go below MINIMUM_ZOOM
        break;
      default:
        break;
    }
  };

  // return a proper cursor for a given tool
  // (cursor changes, when a tool is selected)
  const getCursorType = (tool, _isZoomingIn) => {
    switch (tool) {
      case 'zoom':
        return (_isZoomingIn ? 'zoom-in' : 'zoom-out');
      case 'rotate':
        return 'e-resize';
      case 'moveArtboard':
        return 'all-scroll';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    document.onkeydown = e => {
      e = e || window.event;
      if (e.ctrlKey && e.key.toLowerCase() === 'v') { // CTRL + V/v
        navigator.clipboard.readText().then(text => { // this API support may not be wide enough; should probably try another approach for reading from clipboard
          createNewLayer(); // TODO create a new layer with image pasted from clipboard via url and copied directly
        });
      }
    };
  });


  return (
    <StyledWrapper>
      <Artboard
        id="artboard"
        onMouseDown={e => e.target.id === 'artboard' && setMouseDown(true) && setIsInteractingWithArtboard(true)}
        onMouseMove={e => isMouseDown && handleArtboardInteractionClickAndMove(e)}
        onMouseUp={() => setMouseDown(false) && setIsInteractingWithArtboard(false)}
        onWheel={e => e.target.id === 'artboard' && e.altKey && handleArtboardInteractionWheel(e)}
        cursor={getCursorType(activeTool, isZoomingIn)}
      >
        {!isInteractingWithArtboard &&
        <ValueChangeIndicator>
          {activeTool === 'zoom' && `${Math.round(scale.toFixed(2) * 100)}%`}
          {activeTool === 'rotate' && `${Math.round(rotate)}°`}
        </ValueChangeIndicator>}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            zIndex: -1,
          }}>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: -1,
              overflow: 'hidden',
            }}>
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `rotateZ(${Math.round(rotate)}deg) scale(${scale})`,
                transformOrigin: `${transformOriginX}% ${transformOriginY}%`,
              }}>
              {Object.entries(layers).map((layer, i) => {
                const layerData = layer[1];
                return (
                  <Layer
                    key={i}
                    bgStyle={{
                      ...layerData.bgStyle,
                      background: layerData.bgUrl !== '' ? `url(${layerData.bgUrl})` : layerData.bgStyle.background,
                    }}/>
                );
              })}
            </div>
          </div>
        </div>
        <ToolsMenu>
          <Logo src="https://images2.imgbox.com/0d/da/ZoWZtcIV_o.png" title="App logo" alt="App logo"/>
          <ToolIconContainer
            title="Move Layer Tool"
            isActive={activeTool === 'moveLayer'}
            onClick={() => setActiveTool('moveLayer')}>
            <FiNavigation style={{ transform: 'scaleX(-1) rotate(-15deg)' }}/>
          </ToolIconContainer>
          <ToolIconContainer
            title="Move Artboard Tool"
            isActive={activeTool === 'moveArtboard'}
            onClick={() => setActiveTool('moveArtboard')}>
            <FiMove/>
          </ToolIconContainer>
          <ToolIconContainer
            title="Rotate Tool"
            isActive={activeTool === 'rotate'}
            onClick={() => setActiveTool('rotate')}>
            <FiRotateCw/>
          </ToolIconContainer>
          <ToolIconContainer
            title="Zoom Tool"
            isActive={activeTool === 'zoom'}
            onClick={() => setActiveTool('zoom')}>
            <FiSearch/>
          </ToolIconContainer>
          <ToolIconContainer
            title="Reset Transformations"
            onClick={resetTransformations}>
            <FiSquare/>
          </ToolIconContainer>
          <StyledSettingsIcon/>
        </ToolsMenu>
        <PanelMenu>
          <Button
            type="button"
            onClick={loadPreset}
          > Load preset
          </Button>
          <Button
            type="button"
            onClick={replaceAllImages}
          > Replace all images <FiRefreshCw/>
          </Button>
          <h6>Replaces all images preserving the current layers settings</h6>
          <PanelMenuLabel>
            <FiRewind/> HISTORY
          </PanelMenuLabel>
          <LayerBoxes>
            {Object.entries(layers).map((layer, i) => {
              return (
                <LayerBox key={i}>
                  <LayerTitle style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <small>(Sample history entry)</small>
                  </LayerTitle>
                </LayerBox>
              );
            })}
          </LayerBoxes>
          <PanelMenuLabel>
            <FiSliders style={{ transform: 'rotate(90deg)' }}/> GLOBAL ADJUSTMENTS
          </PanelMenuLabel>
          <small style={{ fontSize: '11px', alignSelf: 'flex-start', marginLeft: '10px' }}>
            <FiPlusCircle style={{ marginBottom: '-2px' }}/> Add an adjustment
          </small>
          <PanelMenuLabel>
            <FiLayers/> LAYERS
          </PanelMenuLabel>
          <LayerBoxes>
            {Object.entries(layers).map((layer, i) => {
              const layerName = layer[0];
              return (
                <LayerBox key={i} isActive={i === 0}>
                  <LayerBoxVisibilityCheckbox isActive={true}>
                    <FaEye/>
                  </LayerBoxVisibilityCheckbox>
                  <LayerTitle>{layerName}</LayerTitle>
                  <DeleteLayerButton onClick={() => deleteLayer(layerName)}>
                    <FiTrash2/>
                  </DeleteLayerButton>
                </LayerBox>
              );
            })}
          </LayerBoxes>
          <Button
            type="button"
            onClick={createNewLayer}
          > New layer <FiPlusSquare/>
          </Button>
          <Button
            type="button"
            onClick={() => setControlsPanelVisible(state => !state)}
          >
            {isControlsPanelVisible ? 'Hide layers adjustments ' : 'Show layers adjustments '}
            <FiSliders style={{ transform: 'rotate(90deg)' }}/>
          </Button>
        </PanelMenu>
        {isControlsPanelVisible && (
          <ControlPanel>
            {Object.entries(layers).map((layer, i) => {
              const layerName = layer[0];
              return <LayerControls
                layerName={layerName}
                deleteLayer={deleteLayer}
                handleLayerControlsChange={handleLayerControlsChange}
                getRandomBgUrl={getRandomBgUrl}
                initialValues={presets[i] || {}}
                key={i}
              />;
            })}
          </ControlPanel>
        )}
      </Artboard>
    </StyledWrapper>
  );
};

export default App;
