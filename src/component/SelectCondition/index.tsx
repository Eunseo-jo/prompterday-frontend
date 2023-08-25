import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Back from '../common/Back';
import MyDisease from '../common/MyDisease';
import Selector from './Selector';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2px solid var(--color-main);
  input {
    width: 100%;
    flex: 1;
    padding: 0 9px;
    box-sizing: border-box;
  }
`;

const MyDiseaseContainer = styled.div`
  height: 80px;
  padding: 10px 20px;
  box-sizing: border-box;
`;

const SelectorBox = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 7px;
`;

const SelectConditionPage = () => {
  const [keyword, setkeyword] = useState('');
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const navigate = useNavigate();

  const resetKeyword = () => {
    setkeyword('');
  };
  const addList = (newList: string) => {
    if (selectedList.includes(newList)) return;
    setSelectedList((list) => [newList, ...list]);
  };

  const deleteList = (deleteItem: string) => {
    const newList = selectedList.filter((item) => item !== deleteItem);
    setSelectedList(newList);
  };

  const resetList = () => {
    setSelectedList([]);
  };

  const onClickNext = () => {
    const data = {
      disease: selectedList,
    };
    const values = encodeURIComponent(JSON.stringify(data));
    navigate(`/select/option?values=${values}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setkeyword(event.target.value);
  };

  return (
    <Wrapper>
      <Header>
        <Back />
        <input
          type="text"
          placeholder="질병, 알러지 검색"
          value={keyword}
          onChange={handleInputChange}
        />
        <Icon
          icon="close"
          size={22}
          color="var(--color-sub-2)"
          onClick={resetKeyword}
        />
      </Header>

      <MyDiseaseContainer>
        <MyDisease
          mode="select"
          selectedList={selectedList}
          onDelete={deleteList}
          reset={resetList}
        />
      </MyDiseaseContainer>

      <SelectorBox>
        <Selector keyword={keyword} addList={addList} />
      </SelectorBox>

      <Button isDisabled={selectedList.length === 0} onClick={onClickNext}>
        다음
      </Button>
    </Wrapper>
  );
};

export default SelectConditionPage;
