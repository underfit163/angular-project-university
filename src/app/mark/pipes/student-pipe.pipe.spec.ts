import { StudentPipePipe } from './student-pipe.pipe';

describe('StudentPipePipe', () => {
  it('create an instance', () => {
    const pipe = new StudentPipePipe();
    expect(pipe).toBeTruthy();
  });
});
