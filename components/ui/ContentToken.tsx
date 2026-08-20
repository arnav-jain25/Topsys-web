/**
 * Renders an unresolved content token so it's visually obvious during review.
 * See docs/CONTENT-REGISTER.md for the full token list.
 * Every {{TOKEN}} on the site must render through this component.
 * None ship to production — the launch checklist blocks them.
 */
export function ContentToken({ id }: { id: string }) {
  return (
    <span
      className="content-token"
      title={`Unresolved content token: ${id} — see docs/CONTENT-REGISTER.md`}
    >
      {`{{${id}}}`}
    </span>
  );
}
