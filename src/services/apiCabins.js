import supabase, { supabaseUrl } from "../../supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("error");
    throw new Error(error);
  }

  return data;
}

export default getCabins;

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //https://yqsunezvmvdyrisrylkv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https:yqsunezvmvdyrisrylkv.supabase.costoragev1objectpubliccabin-images0.6883063923340127-cabin-004.jpg
  console.log(imageName);

  console.log(imagePath);

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log("error inserting cabin");
    throw new Error(error);
  }
  if (hasImagePath) return data;
  // const avatarFile = event.target.files[0]
  const { error: uploadingImageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (uploadingImageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("error deleting cabin");
    throw new Error(error);
  }

  return data;
}
