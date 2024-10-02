
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts, archiveComment, publishComment } from '../../../features/contacts/contactThunk'
import { RootState, AppDispatch } from '../../../app/store'
import { Contact } from '../../interfaces/contactInterfaces'
import {
  Container,
  SectionTitle,
  ReviewSection,
  TableContainer,
  TabNav,
  Table,
  PublishButton,
  ArchiveButton,
} from '../../styles/contact/contactStyles'
import Pagination from '../../components/Pagination'

const ContactPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: comments, status } = useSelector((state: RootState) => state.contacts)
  const [currentTab, setCurrentTab] = useState<'all' | 'published' | 'archived'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContacts())
    }
  }, [dispatch, status])

  const filteredComments = comments.filter((comment: Contact) => {
    if (currentTab === 'all') return true
    return comment.status === currentTab
  })

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentComments = filteredComments.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredComments.length / recordsPerPage)

  const handleTabClick = (tab: 'all' | 'published' | 'archived') => {
    setCurrentTab(tab)
    setCurrentPage(1)
  }

  const handlePublish = (id: number) => {
    dispatch(publishComment(id))
  }

  const handleArchive = (id: number) => {
    dispatch(archiveComment(id))
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

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
            {currentComments.map((comment: Contact) => (
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </TableContainer>
    </Container>
  )
}

export default ContactPage