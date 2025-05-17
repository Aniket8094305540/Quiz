export interface Database {
  public: {
    Tables: {
      quiz_results: {
        Row: {
          id: number;
          created_at: string;
          vibe_type: string;
          session_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          vibe_type: string;
          session_id: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          vibe_type?: string;
          session_id?: string;
        };
      };
      vibe_stats: {
        Row: {
          id: number;
          vibe_type: string;
          count: number;
          percentage: number;
        };
        Insert: {
          id?: number;
          vibe_type: string;
          count: number;
          percentage: number;
        };
        Update: {
          id?: number;
          vibe_type?: string;
          count?: number;
          percentage?: number;
        };
      };
    };
  };
}