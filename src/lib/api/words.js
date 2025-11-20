import { supabase } from '@/lib/supabase'

// Words API
export const wordsApi = {
  // Barcha so'zlarni olish
  async getAll() {
    const { data, error } = await supabase
      .from('suzlar')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data || ["yo`q hech narsa"]
  },

  // ID bo'yicha so'z olish
  async getById(id) {
    const { data, error } = await supabase
      .from('suzlar')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  // Yangi so'z qo'shish
  async create(word) {
    const { data, error } = await supabase
      .from('suzlar')
      .insert([word])
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  // So'zni yangilash
  async update(id, updates) {
    const { data, error } = await supabase
      .from('suzlar')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  // So'zni o'chirish
  async delete(id) {
    const { error } = await supabase
      .from('suzlar')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)
  },

  // So'zlarni qidirish
  async search(term, direction) {
    const column = direction === 'modern' ? 'modern' : 'traditional'
    const { data, error } = await supabase
      .from('suzlar')
      .select('*')
      .ilike(column, `%${term}%`)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data || []
  },
}
