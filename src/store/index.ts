import kv from "@vercel/kv"

export default async function Incr(){
  return kv.incr("hello")
}
