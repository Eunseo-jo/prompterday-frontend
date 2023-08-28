import { DiseaseList } from '../../types/diseaseList';
import styled from 'styled-components';

const SearchListContainer = styled.ul`
  width: 100%;
  height: 100%;
  max-height: 500px;
  list-style: none;
`;

const SearchList = styled.li`
  width: 100%;
  max-width: 330px;
  height: 45px;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-sub-1);
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 0.875rem;
  font-weight: var(--font-regular);
  cursor: pointer;
`;

interface SelectorProps {
  keyword: string;
  addList: (newList: string) => void;
}

const Selector = ({ keyword, addList }: SelectorProps) => {
  const handleItemClick = (disease: string) => {
    addList(disease);
  };

  const filteredList = DiseaseList.filter((disease) =>
    disease.includes(keyword),
  );

  return (
    <SearchListContainer>
      {keyword &&
        filteredList.map((disease) => (
          <SearchList key={disease} onClick={() => handleItemClick(disease)}>
            {disease
              .split(new RegExp(`(${keyword})`, 'gi'))
              .map((text, index) =>
                text === keyword ? (
                  <span key={index} style={{ color: 'var(--color-main)' }}>
                    {text}
                  </span>
                ) : (
                  text
                ),
              )}
          </SearchList>
        ))}
    </SearchListContainer>
  );
};

export default Selector;
