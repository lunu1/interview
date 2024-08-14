import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard{
    display: grid;
    grid-template-columns: 1 fr;

  }
  .dashboard-page{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media(min-width: 992px){
    .dashboard{
      grid-template-columns: auto 1fr;

    }
    .dashboard-page{
      width: 90%;
    }
  }
`;
export default Wrapper;
