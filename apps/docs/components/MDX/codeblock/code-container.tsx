export function CodeContainer(props: any) {
  return (
    <div
      className="sm:& my-8 rounded-lg bg-[#011627]"
      // sx={{ "& > div": { paddingBlock: "5", paddingEnd: "4" } }}
      {...props}
    />
  );
}
