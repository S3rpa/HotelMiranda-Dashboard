import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 5%;
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #333;
  font-size: 1rem; /* Tamaño de fuente por defecto para mejorar legibilidad */
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem; /* Aumenta tamaño de la fuente */
  color: #333;
  margin-bottom: 2rem;
`;

export const ReviewSection = styled.div`
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

export const TableContainer = styled.div`
  background-color: white;
  padding: 2%;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  flex-grow: 1;
`;

export const TabNav = styled.div`
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
    font-size: 1.1rem; /* Aumenta el tamaño de fuente para mejor visibilidad */

    &:hover,
    &.active {
      border-bottom: 0.2em solid #135846;
      color: #135846;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 1.5%;
    border-bottom: 0.1em solid #ddd;
    text-align: left;
    font-size: 1.1rem; /* Aumenta el tamaño de las celdas de la tabla */
    color: #333;
  }

  th {
    background-color: #f1f1f1; /* Mejor contraste para encabezados */
  }
`;

export const PublishButton = styled.button`
  background: none;
  border: none;
  color: #28a745;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #218838;
  }
`;

export const ArchiveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #c82333;
  }
`;
