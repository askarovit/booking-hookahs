export default {
  getListHookahs: `
    SELECT 
      h.*,
      JSON_OBJECT('id', b.id, 'title', b.title) as bar 
    FROM hookah as h
    LEFT JOIN bar as b ON b.id = h.bar_id;
  `,
  createHookah: 'INSERT INTO hookah SET ?;',
  deleteHookah: 'DELETE FROM hookah WHERE title=? AND amount_tube=?;'
}