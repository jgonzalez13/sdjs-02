import * as Yup from 'yup';

const taskFormSchema = Yup.object({
  title: Yup.string().required().min(10).max(120),

  description: Yup.string().required().min(100).max(1000),
});

export default taskFormSchema;
