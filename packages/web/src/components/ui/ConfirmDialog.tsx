import React from 'react';
import styled from 'styled-components';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  max-width: 400px;
  width: 90%;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const Title = styled.h3`
  margin: 0 0 ${props => props.theme.spacing[4]} 0;
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const Message = styled.p`
  margin: 0 0 ${props => props.theme.spacing[6]} 0;
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.textSecondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  justify-content: flex-end;
`;

const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => props.$variant === 'primary' ? `
    background-color: ${props.theme.colors.error};
    color: ${props.theme.colors.textInverse};
    &:hover {
      background-color: ${props.theme.colors.error}dd;
    }
  ` : `
    background-color: ${props.theme.colors.backgroundTertiary};
    color: ${props.theme.colors.text};
    &:hover {
      background-color: ${props.theme.colors.border};
    }
  `}
`;

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <Overlay $isOpen={isOpen} onClick={onCancel}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <Button $variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button $variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </ButtonGroup>
      </Dialog>
    </Overlay>
  );
};