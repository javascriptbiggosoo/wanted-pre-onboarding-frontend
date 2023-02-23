# wanted-pre-onboarding-frontend

선발 과제:  https://github.com/walking-sunset/selection-task



<img src="https://user-images.githubusercontent.com/28939278/217729352-99410acf-85a1-4850-8a91-1c0ba72fdc05.gif"  >

https://tbs01215.github.io/wanted-pre-onboarding-frontend/


### 설치 및 실행

`$ npm install`

`$ npm start`

### 문제 해결 방법

### Assignment 1

- 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여해주세요
    
    → `disabled={!(isValidEmail && isValidPassword)`
    

### Assignment 2

- 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요
    
    → `const navigate = useNavigate(); if (res.ok) navigate("/signin");`
    

### Assignment 3

- 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요
    - 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
    - 응답받은 JWT는 로컬 스토리지에 저장해주세요
        
        → localStorage 분리
        
        ```jsx
        const localStorage = window.localStorage;
        
        export const getItem = (key, defaultValue = null) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : defaultValue;
        };
        
        export const setItem = (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
          } catch (e) {
            console.error(e);
            alert(
              "로컬 스토리지에 저장할 수 없습니다. 데이터 총 용량이 5MB를 넘었을 수 있습니다."
            );
          }
        };
        ```
        

### Assignment 4

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
    - 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
    - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요
        
        → Navigate 사용
        
        ```jsx
        	const [token, setToken] = useState(null);
          useEffect(() => {
            setToken(getItem("access_token", null));
          }, []);
        
          return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Routes>
                <Route
                  path="/"
                  element={
                    token ? <Navigate to="/signin" replace></Navigate> : <Signin />
                  }
                />
                <Route
                  path="/signin"
                  element={
                    token ? (
                      <Navigate to="/todo" replace></Navigate>
                    ) : (
                      <Signin setToken={setToken} />
                    )
                  }
                />
        				...
        ```
        
