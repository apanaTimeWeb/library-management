import { EnquiriesIdClient } from './_components/EnquiriesIdClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <EnquiriesIdClient params={params} />;
}
