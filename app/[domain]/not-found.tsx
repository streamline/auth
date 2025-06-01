import Logo from '@/components/icons/Logo';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import Separator from '@/components/ui/AuthForms/Separator';

export default async function NotFound({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { disable_button: boolean; redirect?: string };
}) {
  return (
    <div className="flex justify-center signin-height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-full">
        <div className="flex justify-center pb-12 ">
          <Logo width="160px" />
        </div>
        <Card
          title="Page Not Found"
        >
          <Separator text="–" />
          <p>
            <Link href="/" className="font-light text-sm">
              {'←'} Back Home
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
