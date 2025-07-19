import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { usePreferencesStore } from '@fics/shared';

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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.container};
  box-shadow: ${props => props.theme.shadows.xl};
  width: 90%;
  max-width: 800px;
  height: 80vh;
  max-height: 600px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing[4]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
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

const Content = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid ${props => props.theme.colors.border};
  overflow-y: auto;
  padding: ${props => props.theme.spacing[3]};
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[2]};
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
  align-items: center;
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

const SettingControl = styled.div`
  display: flex;
  align-items: center;
`;

const Toggle = styled.input`
  width: 44px;
  height: 24px;
  -webkit-appearance: none;
  appearance: none;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-radius: 12px;
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }
  
  &:checked::before {
    transform: translateX(20px);
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

const ColorInput = styled.input`
  width: 60px;
  height: 32px;
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
  const [selectedCategory, setSelectedCategory] = useState('appearance');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = settingsRegistry.getAllCategories();
  const settings = searchQuery 
    ? settingsRegistry.search(searchQuery)
    : settingsRegistry.getByCategory(selectedCategory);

  const handleSettingChange = (settingId: string, value: any) => {
    const setting = settingsRegistry.get(settingId);
    if (setting) {
      setting.value = value;
      setting.onChange?.(value);
    }
  };

  const renderSettingControl = (setting: any) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <Toggle
            type="checkbox"
            checked={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
          />
        );
      
      case 'select':
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
          />
        );
      
      case 'text':
        return (
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Text input not yet implemented
          </span>
        );
      
      default:
        return null;
    }
  };

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Dialog>
        <Header>
          <Title>⚙️ Settings</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>
        
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        
        <Content>
          <Sidebar>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                $active={selectedCategory === category.id && !searchQuery}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchQuery('');
                }}
              >
                <CategoryIcon>{category.icon}</CategoryIcon>
                {category.label}
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
              {settings.map(setting => (
                <SettingRow key={setting.id}>
                  <SettingInfo>
                    <SettingLabel>{setting.label}</SettingLabel>
                    {setting.description && (
                      <SettingDescription>{setting.description}</SettingDescription>
                    )}
                  </SettingInfo>
                  <SettingControl>
                    {renderSettingControl(setting)}
                  </SettingControl>
                </SettingRow>
              ))}
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