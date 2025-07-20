import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { usePreferencesStore } from '@fics/shared';
import { useLayout } from '../../theme/hooks';
import { CustomSoundUpload } from './CustomSoundUpload';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 1000;
`;

const Dialog = styled.div<{ $x: number; $y: number; $isMobile: boolean }>`
  position: fixed;
  left: ${props => props.$isMobile ? 0 : props.$x}px;
  top: ${props => props.$isMobile ? 0 : props.$y}px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.$isMobile ? 0 : props.theme.borderRadius.container};
  box-shadow: ${props => props.theme.shadows.xl};
  width: ${props => props.$isMobile ? '100%' : '90%'};
  max-width: ${props => props.$isMobile ? 'none' : '800px'};
  height: ${props => props.$isMobile ? '100vh' : '80vh'};
  max-height: ${props => props.$isMobile ? 'none' : '600px'};
  display: flex;
  flex-direction: column;
  pointer-events: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing[4]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  cursor: move;
  user-select: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const SearchContainer = styled.div`
  padding: ${props => props.theme.spacing[3]};
  padding-bottom: 0;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  box-sizing: border-box;
  
  &::placeholder {
    color: ${props => props.theme.colors.textTertiary};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Content = styled.div<{ $isMobile: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: ${props => props.$isMobile ? 'column' : 'row'};
  overflow: hidden;
`;

const Sidebar = styled.div<{ $isMobile: boolean }>`
  width: ${props => props.$isMobile ? '100%' : '200px'};
  border-right: ${props => props.$isMobile ? 'none' : `1px solid ${props.theme.colors.border}`};
  border-bottom: ${props => props.$isMobile ? `1px solid ${props.theme.colors.border}` : 'none'};
  overflow-y: ${props => props.$isMobile ? 'visible' : 'auto'};
  overflow-x: ${props => props.$isMobile ? 'auto' : 'visible'};
  padding: ${props => props.theme.spacing[3]};
  ${props => props.$isMobile && `
    display: flex;
    gap: ${props.theme.spacing[2]};
    flex-shrink: 0;
  `}
`;

const CategoryButton = styled.button<{ $active: boolean; $isMobile?: boolean }>`
  width: ${props => props.$isMobile ? 'auto' : '100%'};
  flex-shrink: ${props => props.$isMobile ? '0' : '1'};
  white-space: ${props => props.$isMobile ? 'nowrap' : 'normal'};
  text-align: left;
  padding: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.$isMobile ? '0' : props.theme.spacing[2]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  }
`;

const CategoryIcon = styled.span`
  margin-right: ${props => props.theme.spacing[2]};
`;

const SettingsArea = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing[4]};
  overflow-y: auto;
  min-width: 0; // Prevent flex child from overflowing
`;

const SettingGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const SettingRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
  margin-right: ${props => props.theme.spacing[4]};
`;

const SettingLabel = styled.label`
  display: block;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const SettingDescription = styled.p`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const SettingControl = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  ${props => props.$fullWidth && `
    flex: 1;
    max-width: 500px;
  `}
`;

const Toggle = styled.input<{ $isMobile?: boolean }>`
  width: ${props => props.$isMobile ? '52px' : '44px'};
  height: ${props => props.$isMobile ? '28px' : '24px'};
  -webkit-appearance: none;
  appearance: none;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: ${props => props.$isMobile ? '14px' : '12px'};
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;
  
  &:checked {
    background-color: ${props => props.theme.colors.primary};
  }
  
  &::before {
    content: '';
    position: absolute;
    width: ${props => props.$isMobile ? '24px' : '20px'};
    height: ${props => props.$isMobile ? '24px' : '20px'};
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }
  
  &:checked::before {
    transform: translateX(${props => props.$isMobile ? '24px' : '20px'});
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const NumberInput = styled.input`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  width: 80px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ColorInput = styled.input<{ $isMobile?: boolean }>`
  width: ${props => props.$isMobile ? '80px' : '60px'};
  height: ${props => props.$isMobile ? '40px' : '32px'};
  padding: ${props => props.theme.spacing[1]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-family: monospace;
  resize: vertical;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &.error {
    border-color: ${props => props.theme.colors.error || '#ff0000'};
  }
`;

const ValidationMessage = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.error || '#ff0000'};
  margin-top: ${props => props.theme.spacing[1]};
`;

const SoundInfo = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
`;

const PlayButton = styled.button`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResetButton = styled.button`
  padding: ${props => props.theme.spacing[1]};
  margin-left: ${props => props.theme.spacing[2]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: transparent;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    color: ${props => props.theme.colors.text};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[4]};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const FooterButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
`;

const SearchInfo = styled.p`
  margin: 0 0 ${props => props.theme.spacing[4]} 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$variant === 'primary' ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  ` : `
    background-color: transparent;
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background-color: ${props.theme.colors.backgroundSecondary};
    }
  `}
`;

export const SettingsDialog: React.FC<SettingsDialogProps> = observer(({ isOpen, onClose }) => {
  const preferencesStore = usePreferencesStore();
  const { settingsRegistry } = preferencesStore;
  const layout = useLayout();
  const isMobile = layout.isMobileDevice || layout.dimensions.width < 768;
  const [selectedCategory, setSelectedCategory] = useState('appearance');
  const [searchQuery, setSearchQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Drag state (disabled on mobile)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

  // Initialize position to center of screen (desktop only)
  useEffect(() => {
    if (isOpen && dialogRef.current && !isMobile) {
      const rect = dialogRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [isOpen, isMobile]);

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  if (!isOpen) return null;

  const categories = settingsRegistry.getAllCategories();
  const settings = searchQuery 
    ? settingsRegistry.search(searchQuery)
    : settingsRegistry.getByCategory(selectedCategory);

  const handleSettingChange = (settingId: string, value: any) => {
    const setting = settingsRegistry.get(settingId);
    if (setting) {
      // Validate if validator exists
      if (setting.validate) {
        const validationResult = setting.validate(value);
        if (typeof validationResult === 'string') {
          // Validation failed with error message
          setValidationErrors(prev => ({ ...prev, [settingId]: validationResult }));
          return;
        } else if (validationResult === false) {
          // Validation failed without specific message
          setValidationErrors(prev => ({ ...prev, [settingId]: 'Invalid value' }));
          return;
        }
      }
      
      // Clear any existing validation error
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[settingId];
        return newErrors;
      });
      
      setting.value = value;
      setting.onChange?.(value);
      
      // Update preferences immediately for instant apply
      // Check if the setting exists in preferences
      if (settingId in preferencesStore.preferences) {
        preferencesStore.updatePreference(settingId as any, value);
      }
    }
  };

  const handleResetToDefault = (settingId: string) => {
    const setting = settingsRegistry.get(settingId);
    if (setting) {
      handleSettingChange(settingId, setting.defaultValue);
    }
  };

  const handleCustomSoundUpload = (settingId: string, dataUrl: string, fileName: string) => {
    // Store custom sound in localStorage
    const customSounds = JSON.parse(localStorage.getItem('customSounds') || '{}');
    const soundKey = `custom_${settingId}_${Date.now()}`;
    customSounds[soundKey] = {
      dataUrl,
      fileName,
      settingId,
      uploadDate: new Date().toISOString()
    };
    localStorage.setItem('customSounds', JSON.stringify(customSounds));
    
    // Update the setting to use the custom sound
    handleSettingChange(settingId, soundKey);
    
    // Update the setting's options to include the custom sound
    const setting = settingsRegistry.get(settingId);
    if (setting && setting.options) {
      // Add custom sound to options if not already there
      const customOption = { label: `Custom: ${fileName}`, value: soundKey };
      const existingOptions = setting.options.filter(opt => !opt.value.startsWith('custom_'));
      setting.options = [...existingOptions, customOption];
    }
  };

  const playSound = (soundValue: string) => {
    if (!soundValue || soundValue === 'none') return;
    
    try {
      let audioSrc: string;
      
      // Check if it's a custom sound
      if (soundValue.startsWith('custom_')) {
        const customSounds = JSON.parse(localStorage.getItem('customSounds') || '{}');
        const customSound = customSounds[soundValue];
        if (customSound && customSound.dataUrl) {
          audioSrc = customSound.dataUrl;
        } else {
          console.error('Custom sound not found:', soundValue);
          return;
        }
      } else {
        // Use the default sound path
        audioSrc = `/sounds/${soundValue}`;
      }
      
      const audio = new Audio(audioSrc);
      audio.volume = 0.5; // Set to 50% volume
      audio.play().catch(err => {
        console.error('Failed to play sound:', err);
      });
    } catch (err) {
      console.error('Error playing sound:', err);
    }
  };

  // Drag handlers (desktop only)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const renderSettingControl = (setting: any) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <Toggle
            type="checkbox"
            checked={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
            $isMobile={isMobile}
          />
        );
      
      case 'select':
        const isSoundSetting = setting.id.endsWith('SoundFile');
        if (isSoundSetting) {
          // For sound settings, show current sound, play button, and upload button
          const currentOption = setting.options?.find((opt: any) => opt.value === setting.value);
          const displayValue = currentOption ? currentOption.label : 'None';
          const canPlay = setting.value && setting.value !== 'none';
          
          return (
            <ControlWrapper>
              <SoundInfo>{displayValue}</SoundInfo>
              <PlayButton 
                type="button"
                onClick={() => playSound(setting.value)}
                disabled={!canPlay}
                title={canPlay ? 'Play sound' : 'No sound selected'}
              >
                ▶️ Play
              </PlayButton>
              <CustomSoundUpload
                settingId={setting.id}
                onUpload={handleCustomSoundUpload}
              />
            </ControlWrapper>
          );
        } else {
          return (
            <Select
              value={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            >
              {setting.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          );
        }
      
      case 'number':
        return (
          <NumberInput
            type="number"
            value={setting.value}
            min={setting.min}
            max={setting.max}
            step={setting.step}
            onChange={(e) => handleSettingChange(setting.id, Number(e.target.value))}
          />
        );
      
      case 'color':
        return (
          <ColorInput
            type="color"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            $isMobile={isMobile}
          />
        );
      
      case 'text':
        const hasError = !!validationErrors[setting.id];
        return (
          <div style={{ width: '100%' }}>
            <TextArea
              value={setting.value || ''}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              className={hasError ? 'error' : ''}
              placeholder={setting.placeholder || ''}
              spellCheck={false}
            />
            {hasError && (
              <ValidationMessage>{validationErrors[setting.id]}</ValidationMessage>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Overlay>
      <Dialog ref={dialogRef} $x={position.x} $y={position.y} $isMobile={isMobile}>
        <Header onMouseDown={handleMouseDown}>
          <Title>⚙️ Settings</Title>
          <CloseButton onClick={onClose} onMouseDown={(e) => e.stopPropagation()}>✕</CloseButton>
        </Header>
        
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        
        <Content $isMobile={isMobile}>
          <Sidebar $isMobile={isMobile}>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                $active={selectedCategory === category.id && !searchQuery}
                $isMobile={isMobile}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery('');
                }}
              >
                <CategoryIcon>{category.icon}</CategoryIcon>
                {!isMobile && category.label}
              </CategoryButton>
            ))}
          </Sidebar>
          
          <SettingsArea>
            {searchQuery && (
              <SearchInfo>
                Found {settings.length} settings matching "{searchQuery}"
              </SearchInfo>
            )}
            
            <SettingGroup>
              {settings.map(setting => {
                if (setting.type === 'text') {
                  // For text inputs, stack vertically
                  return (
                    <SettingRow key={setting.id} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <SettingLabel>{setting.label}</SettingLabel>
                          {setting.description && (
                            <SettingDescription>{setting.description}</SettingDescription>
                          )}
                        </div>
                        {setting.value !== setting.defaultValue && (
                          <ResetButton
                            type="button"
                            onClick={() => handleResetToDefault(setting.id)}
                            title="Reset to default"
                            style={{ marginLeft: '8px', marginTop: 0 }}
                          >
                            ↻
                          </ResetButton>
                        )}
                      </div>
                      {renderSettingControl(setting)}
                    </SettingRow>
                  );
                }
                // Regular layout for other setting types
                return (
                  <SettingRow key={setting.id}>
                    <SettingInfo>
                      <SettingLabel>{setting.label}</SettingLabel>
                      {setting.description && (
                        <SettingDescription>{setting.description}</SettingDescription>
                      )}
                    </SettingInfo>
                    <SettingControl>
                      {renderSettingControl(setting)}
                      {setting.value !== setting.defaultValue && (
                        <ResetButton
                          type="button"
                          onClick={() => handleResetToDefault(setting.id)}
                          title="Reset to default"
                        >
                          ↻
                        </ResetButton>
                      )}
                    </SettingControl>
                  </SettingRow>
                );
              })}
            </SettingGroup>
          </SettingsArea>
        </Content>
        
        <Footer>
          <Button onClick={() => preferencesStore.resetToDefaults()}>
            Reset to Defaults
          </Button>
          <FooterButtons>
            <Button onClick={onClose}>Cancel</Button>
            <Button $variant="primary" onClick={onClose}>
              Done
            </Button>
          </FooterButtons>
        </Footer>
      </Dialog>
    </Overlay>
  );
});

SettingsDialog.displayName = 'SettingsDialog';