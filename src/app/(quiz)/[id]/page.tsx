export default async function Quiz({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>Quiz {id}</div>;
}
