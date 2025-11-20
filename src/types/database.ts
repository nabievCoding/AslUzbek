export interface Database {
  public: {
    Tables: {
      suzlar: {
        Row: {
          id: string;
          modern: string;
          traditional: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          modern: string;
          traditional: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          modern?: string;
          traditional?: string;
          description?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

export type WordRow = Database['public']['Tables']['suzlar']['Row'];
export type WordInsert = Database['public']['Tables']['suzlar']['Insert'];
export type WordUpdate = Database['public']['Tables']['suzlar']['Update'];
