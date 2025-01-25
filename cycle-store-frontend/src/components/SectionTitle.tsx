type TSectionTitle = {
  subtitle: string;
  title: string;
  description: string;
};

export default function SectionTitle({
  subtitle,
  title,
  description,
}: TSectionTitle) {
  return (
    <>
      <div className="text-center text-white max-w-[867px] mx-auto mb-14">
        <h6 className="text-sm font-medium tracking-[4.32px] text-brand">
          {subtitle}
        </h6>
        <h1 className="text-4xl font-semibold mt-2 mb-9">{title}</h1>
        <p className="">{description}</p>
      </div>
    </>
  );
}
