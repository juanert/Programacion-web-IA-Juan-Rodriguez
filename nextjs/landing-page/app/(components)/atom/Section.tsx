export default function Section({children}: {children: React.ReactNode}) {
  return (
    <section className="bg-white h-[80vh] min-h-[400px] flex flex-col">
       {children}
    </section>
  );
}
