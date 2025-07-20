import React, { useRef } from 'react';
import styled from 'styled-components';

interface CustomSoundUploadProps {
  settingId: string;
  onUpload: (settingId: string, dataUrl: string, fileName: string) => void;
}

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
`;

export const CustomSoundUpload: React.FC<CustomSoundUploadProps> = ({ settingId, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/webm'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid audio file (MP3, WAV, OGG, or WebM)');
      return;
    }

    // Validate file size (max 1MB)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      alert('File size must be less than 1MB');
      return;
    }

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onUpload(settingId, dataUrl, file.name);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />
      <UploadButton type="button" onClick={handleClick}>
        Upload
      </UploadButton>
    </>
  );
};