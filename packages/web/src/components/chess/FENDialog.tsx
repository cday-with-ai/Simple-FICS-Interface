import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';

interface FENDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

const DialogContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  width: 90%;
  max-width: 500px;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const DialogTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.text};
`;

const FENInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing[3]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: ${props => props.theme.typography.fontFamilyMono};
  font-size: ${props => props.theme.typography.fontSize.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing[2]};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const HelpText = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  justify-content: flex-end;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$variant === 'primary' ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.colors.primaryHover};
    }
  ` : `
    background-color: transparent;
    color: ${props.theme.colors.textSecondary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background-color: ${props.theme.colors.surface};
    }
  `}
`;

const PresetButton = styled.button`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  margin-right: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const PresetSection = styled.div`
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const PresetLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const CurrentFENInput = styled(FENInput)`
  margin-bottom: ${props => props.theme.spacing[2]};
  background-color: ${props => props.theme.colors.surfaceElevated};
  cursor: text;
`;

export const FENDialog: React.FC<FENDialogProps> = observer(({ isOpen, onClose }) => {
  const { gameStore } = useRootStore();
  const [fen, setFen] = useState('');
  const [error, setError] = useState('');
  
  // Get current position FEN
  const currentFEN = gameStore.currentPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  const handleFENChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFen(e.target.value);
    setError('');
  }, []);
  
  const handleSetPosition = useCallback(() => {
    try {
      const success = gameStore.loadPosition(fen.trim());
      if (success) {
        onClose();
        setFen('');
        setError('');
      } else {
        setError('Invalid FEN string. Please check the format.');
      }
    } catch (err) {
      setError('Invalid FEN string. Please check the format.');
    }
  }, [fen, gameStore, onClose]);
  
  const handlePreset = useCallback((presetFen: string) => {
    setFen(presetFen);
    setError('');
    // Immediately load the preset position
    try {
      const success = gameStore.loadPosition(presetFen);
      if (success) {
        onClose();
        setFen('');
      } else {
        setError('Failed to load preset position.');
      }
    } catch (err) {
      setError('Failed to load preset position.');
    }
  }, [gameStore, onClose]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && fen.trim()) {
      handleSetPosition();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [fen, handleSetPosition, onClose]);
  
  // Preset position
  const presets = [
    { name: 'Sicilian Dragon', fen: 'r1bqkb1r/pp2pp1p/2np1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 7' },
  ];
  
  if (!isOpen) return null;
  
  return (
    <DialogOverlay $isOpen={isOpen} onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Set Position from FEN</DialogTitle>
        
        <HelpText>
          Enter a FEN (Forsyth-Edwards Notation) string to set up a custom position.
        </HelpText>
        
        <PresetSection>
          <PresetLabel>Current position:</PresetLabel>
          <CurrentFENInput
            type="text"
            value={currentFEN}
            readOnly
            onClick={(e) => e.currentTarget.select()}
          />
        </PresetSection>
        
        <PresetSection>
          <PresetLabel>Preset position:</PresetLabel>
          {presets.map((preset) => (
            <PresetButton
              key={preset.name}
              onClick={() => handlePreset(preset.fen)}
            >
              {preset.name}
            </PresetButton>
          ))}
        </PresetSection>
        
        <FENInput
          type="text"
          value={fen}
          onChange={handleFENChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
          autoFocus
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            $variant="primary" 
            onClick={handleSetPosition}
            disabled={!fen.trim()}
          >
            Set Position
          </Button>
        </ButtonGroup>
      </DialogContent>
    </DialogOverlay>
  );
});

FENDialog.displayName = 'FENDialog';