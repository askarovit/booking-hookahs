export default {
  getListCustomer: `
    SELECT customer, date
    FROM \`order\` as o
    WHERE date >= now()
    ORDER BY date;
  `,
  makeOrder: `CALL make_order_hookah_procedure(?,?,?)`,
  getFreeHookah: `CALL get_free_hookahs_procedure(?,?,?)`
}