// dsh-cerrda-theme — host half (carrier row).
//
// All functionality lives in the browser half (`exports["./client"]`, served
// by dsh-client-modules). This host module exists only so the loader row
// activates: dsh-client-modules includes a row in the browser roster only
// when the row's fiber is alive, and a client bundle without a host half has
// no row to key on. It intentionally provides no services and consumes none.
export default {
  name: 'dsh-cerrda-theme',
  apply() {},
}
