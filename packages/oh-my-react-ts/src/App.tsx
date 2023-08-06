import {
  ChangeEventHandler,
  // FormEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.css';
import { Container } from './Container';
import { TodoList } from './TodoList';
import Counter from './Counter';

// 定义类型
// type ChangeFn = (e: FormEvent<HTMLInputElement>) => void;

function App() {
  const [title, setTitle] = useState('Container');
  const ref1 = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref1.current!.focus();
  }, [ref1.current]);
  // 定义回调函数
  // 1.FormEvent
  // const onChange: ChangeFn = (e) => {
  //   setTitle(e.currentTarget.value);
  // };
  //ChangeEventHandler
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === 'Enter') {
      console.log('enter');
    }
  };
  return (
    <>
      <Container title={title}>
        {/* 设置 ref */}
        <input
          type="text"
          ref={ref1}
          value={title}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <TodoList message="TodoMVC"/>
        <Counter />
      </Container>
    </>
  );
}

export default App;