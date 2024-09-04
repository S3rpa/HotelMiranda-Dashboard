import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publishComment, archiveComment } from '../../../features/contacts/contactSlice';
import { fetchContacts, Contact } from '../../../features/contacts/contactThunk';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../../app/store';

const Container = styled.div`
  padding: 5%;
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const ReviewSection = styled.div`
  background-color: white;
  padding: 5%;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TableContainer = styled.div`
  background-color: white;
  padding: 2%;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  flex-grow: 1;
`;

const TabNav = styled.div`
  display: flex;
  border-bottom: 0.1em solid #ddd;
  margin-bottom: 2rem;

  button {
    padding: 1% 2%;
    background: none;
    border: none;
    border-bottom: 0.2em solid transparent;
    cursor: pointer;
    font-weight: bold;
    color: #333;

    &:hover, &.active {
      border-bottom: 0.2em solid #135846;
      color: #135846;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1.5%;
    border-bottom: 0.1em solid #ddd;
    text-align: left;
    font-size: 1rem;
  }
`;

const PublishButton = styled.button`
  background: none;
  border: none;
  color: #28a745;
  cursor: pointer;

  &:hover {
    color: #218838;
  }
`;

const ArchiveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;

  &:hover {
    color: #c82333;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: ${({ $active }) => ($active ? '#135846' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #135846;
    color: white;
  }
`;

interface Comment {
  Contact_id: number;
  Date: string;
  Customer: string;
  Comment: string;
  status?: 'published' | 'archived' | null;
}

const ContactPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: comments, status } = useSelector((state: RootState) => state.contacts);
  const [currentTab, setCurrentTab] = useState<'all' | 'published' | 'archived'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContacts());
    }
  }, [dispatch, status]);

  const filteredComments = comments.filter((comment: Comment) => {
    if (currentTab === 'all') return true;
    return comment.status === currentTab;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredComments.length / recordsPerPage);

  const handleTabClick = (tab: 'all' | 'published' | 'archived') => {
    setCurrentTab(tab);
    setCurrentPage(1);
  };

  const handlePublish = (id: number) => {
    dispatch(publishComment(id));
  };

  const handleArchive = (id: number) => {
    dispatch(archiveComment(id));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <SectionTitle>Latest Review by Customers</SectionTitle>
      <ReviewSection>
      </ReviewSection>

      <SectionTitle>All Comments</SectionTitle>
      <TableContainer>
        <TabNav>
          <button
            className={currentTab === 'all' ? 'active' : ''}
            onClick={() => handleTabClick('all')}
          >
            All Comments
          </button>
          <button
            className={currentTab === 'published' ? 'active' : ''}
            onClick={() => handleTabClick('published')}
          >
            Published
          </button>
          <button
            className={currentTab === 'archived' ? 'active' : ''}
            onClick={() => handleTabClick('archived')}
          >
            Archived
          </button>
        </TabNav>
        <Table>
          <thead>
            <tr>
              <th>Contact ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map((comment: Comment) => (
              <tr key={comment.Contact_id}>
                <td>#{comment.Contact_id}</td>
                <td>{comment.Date}</td>
                <td>{comment.Customer}</td>
                <td>{comment.Comment}</td>
                <td>
                  {comment.status === 'archived' ? (
                    <PublishButton onClick={() => handlePublish(comment.Contact_id)}>
                      Publish
                    </PublishButton>
                  ) : (
                    <ArchiveButton onClick={() => handleArchive(comment.Contact_id)}>
                      Archive
                    </ArchiveButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index}
              $active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      </TableContainer>
    </Container>
  );
};

export default ContactPage;
