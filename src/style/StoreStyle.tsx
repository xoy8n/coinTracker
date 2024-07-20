import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 35px;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.span`
  display: block;
  text-align: center;
`;

export const Description = styled.p`
  margin: 20px 0;
  font-size: 20px;
`;
export const ContentBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  > button {
    color: white;
  }
`;
export const LikesButton = styled.button`
  display: block;
  flex: 0 1 20%;
  height: 50px;
  border: none;
  background: none;
  svg {
    height: 30px;
  }
`;
