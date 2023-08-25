import { DiseaseList } from '../../types/diseaseList';
import styled from 'styled-components';

const SearchListContainer = styled.ul`
  width: 100%;
  height: 100%;
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

function Selector({ keyword, addList }: SelectorProps) {
  const handleItemClick = (disease: string) => {
    addList(disease);
  };

  const filteredList = DiseaseList.filter((disease) =>
    disease.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <SearchListContainer>
      {keyword &&
        filteredList.map((disease) => (
          <SearchList key={disease} onClick={() => handleItemClick(disease)}>
            <span
              dangerouslySetInnerHTML={{
                // XSS 취약
                __html: disease.replace(
                  new RegExp(`(${keyword})`, 'gi'),
                  `<span style="color: var(--color-main);">$1</span>`,
                ),
              }}
            />
          </SearchList>
        ))}
    </SearchListContainer>
  );
}

export default Selector;
