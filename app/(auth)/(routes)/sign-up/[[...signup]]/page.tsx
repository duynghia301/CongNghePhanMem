import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Đăng ký | Fast Home",
  description: "Đồ Án Group 6",
};
export default function Page() {
  return <SignUp />
}