import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useBackendStore } from '@fics/shared';
import { WhoRecord } from '@fics/shared';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 1rem;
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RecordsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RecordItem = styled.div`
  padding: 0.75rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 4px;
  border-left: 3px solid ${props => props.theme.colors.primary};
`;

const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserInfo = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const RecordDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
`;

const DetailValue = styled.span`
  color: ${props => props.theme.colors.text};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.error};
`;

const LoadMoreButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const UserHistory = observer(() => {
  const backendStore = useBackendStore();
  const [searchUsername, setSearchUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 50;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      setCurrentUsername(searchUsername.trim());
      setOffset(0);
      backendStore.loadUserHistory(searchUsername.trim(), limit, 0);
    }
  };

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    backendStore.loadUserHistory(currentUsername, limit, newOffset);
  };

  const records = currentUsername ? backendStore.getUserHistory(currentUsername) : [];
  const isLoading = currentUsername ? backendStore.isUserLoading(currentUsername) : false;
  const error = currentUsername ? backendStore.getUserError(currentUsername) : null;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderRecord = (record: WhoRecord) => (
    <RecordItem key={record.id}>
      <RecordHeader>
        <UserInfo>
          {record.title && `${record.title} `}{record.username} ({record.rating})
        </UserInfo>
        <Timestamp>{formatTimestamp(record.timestamp)}</Timestamp>
      </RecordHeader>
      <RecordDetails>
        <DetailItem>
          <DetailLabel>Status</DetailLabel>
          <DetailValue>{record.status}</DetailValue>
        </DetailItem>
        {record.rating_type && (
          <DetailItem>
            <DetailLabel>Rating Type</DetailLabel>
            <DetailValue>{record.rating_type}</DetailValue>
          </DetailItem>
        )}
        {record.flags && (
          <DetailItem>
            <DetailLabel>Flags</DetailLabel>
            <DetailValue>{record.flags}</DetailValue>
          </DetailItem>
        )}
        {record.opponent && (
          <DetailItem>
            <DetailLabel>Opponent</DetailLabel>
            <DetailValue>{record.opponent}</DetailValue>
          </DetailItem>
        )}
        {record.time_control && (
          <DetailItem>
            <DetailLabel>Time Control</DetailLabel>
            <DetailValue>{record.time_control}</DetailValue>
          </DetailItem>
        )}
        {record.game_info && (
          <DetailItem>
            <DetailLabel>Game Info</DetailLabel>
            <DetailValue>{record.game_info}</DetailValue>
          </DetailItem>
        )}
      </RecordDetails>
    </RecordItem>
  );

  return (
    <Container>
      <Header>
        <Title>User History</Title>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Enter username to search..."
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <SearchButton type="submit" disabled={!searchUsername.trim() || isLoading}>
            Search
          </SearchButton>
        </SearchForm>
      </Header>

      <RecordsContainer>
        {error && <ErrorMessage>Error: {error}</ErrorMessage>}
        
        {!currentUsername && !error && (
          <LoadingMessage>Enter a username to view their history.</LoadingMessage>
        )}
        
        {currentUsername && !error && records.length === 0 && !isLoading && (
          <LoadingMessage>No records found for {currentUsername}.</LoadingMessage>
        )}
        
        {records.map(renderRecord)}
        
        {isLoading && <LoadingMessage>Loading user history...</LoadingMessage>}
        
        {!isLoading && records.length > 0 && records.length >= offset + limit && (
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            Load More
          </LoadMoreButton>
        )}
      </RecordsContainer>
    </Container>
  );
});