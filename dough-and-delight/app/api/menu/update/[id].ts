export async function PUT(req: Request, { params }: any) {
  const id = params.id;
  const body = await req.json();

  // 👉 update DB here using id
  // Example:
  // await db.menu.update({ where: { id }, data: body })

  return Response.json({
    success: true,
    data: body,
  });
}