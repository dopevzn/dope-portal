export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrganizationRole =
  | "owner"
  | "media_director"
  | "admin"
  | "photographer"
  | "videographer"
  | "editor"
  | "scout"
  | "coach"
  | "sponsor"
  | "viewer";

type BaseRow = {
  id: string;
  created_at: string;
  updated_at: string;
};

type BaseInsert = {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type BaseUpdate = {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: BaseRow & {
          name: string;
          slug: string;
          tenant_type: string;
          logo_url: string | null;
          brand_color: string | null;
          status: string;
          timezone: string;
          storage_limit_gb: number;
          metadata: Json;
        };
        Insert: BaseInsert & {
          name: string;
          slug: string;
          tenant_type?: string;
          logo_url?: string | null;
          brand_color?: string | null;
          status?: string;
          timezone?: string;
          storage_limit_gb?: number;
          metadata?: Json;
        };
        Update: BaseUpdate & {
          name?: string;
          slug?: string;
          tenant_type?: string;
          logo_url?: string | null;
          brand_color?: string | null;
          status?: string;
          timezone?: string;
          storage_limit_gb?: number;
          metadata?: Json;
        };
        Relationships: [];
      };
      user_profiles: {
        Row: BaseRow & {
          clerk_user_id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          title: string | null;
          metadata: Json;
        };
        Insert: BaseInsert & {
          clerk_user_id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          phone?: string | null;
          title?: string | null;
          metadata?: Json;
        };
        Update: BaseUpdate & {
          clerk_user_id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          title?: string | null;
          metadata?: Json;
        };
        Relationships: [];
      };
      organization_members: {
        Row: BaseRow & {
          organization_id: string;
          user_profile_id: string | null;
          clerk_user_id: string;
          role: OrganizationRole;
          status: string;
          invited_at: string | null;
          joined_at: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          user_profile_id?: string | null;
          clerk_user_id: string;
          role: OrganizationRole;
          status?: string;
          invited_at?: string | null;
          joined_at?: string | null;
        };
        Update: BaseUpdate & {
          organization_id?: string;
          user_profile_id?: string | null;
          clerk_user_id?: string;
          role?: OrganizationRole;
          status?: string;
          invited_at?: string | null;
          joined_at?: string | null;
        };
        Relationships: [];
      };
      venues: {
        Row: BaseRow & {
          organization_id: string;
          name: string;
          city: string;
          state: string;
          address: string | null;
          timezone: string;
          court_count: number;
          contact_name: string | null;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          name: string;
          city: string;
          state: string;
          address?: string | null;
          timezone?: string;
          court_count?: number;
          contact_name?: string | null;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["venues"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: BaseRow & {
          organization_id: string;
          venue_id: string | null;
          name: string;
          event_type: string;
          starts_at: string;
          ends_at: string;
          status: string;
          visibility: string;
          courts: string[];
          age_groups: string[];
          media_priority: string;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          venue_id?: string | null;
          name: string;
          event_type: string;
          starts_at: string;
          ends_at: string;
          status?: string;
          visibility?: string;
          courts?: string[];
          age_groups?: string[];
          media_priority?: string;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      schools: {
        Row: BaseRow & {
          organization_id: string;
          name: string;
          city: string;
          state: string;
          classification: string | null;
          conference: string | null;
          website: string | null;
          logo_url: string | null;
          primary_contact: string | null;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          name: string;
          city: string;
          state: string;
          classification?: string | null;
          conference?: string | null;
          website?: string | null;
          logo_url?: string | null;
          primary_contact?: string | null;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["schools"]["Insert"]>;
        Relationships: [];
      };
      teams: {
        Row: BaseRow & {
          organization_id: string;
          school_id: string | null;
          name: string;
          level: string;
          season: string;
          coach_name: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          school_id?: string | null;
          name: string;
          level: string;
          season: string;
          coach_name?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["teams"]["Insert"]>;
        Relationships: [];
      };
      athletes: {
        Row: BaseRow & {
          organization_id: string;
          school_id: string | null;
          team_id: string | null;
          first_name: string;
          last_name: string;
          graduation_year: number;
          position: string;
          height: string | null;
          jersey_number: string | null;
          recruiting_status: string;
          hometown: string | null;
          instagram_handle: string | null;
          profile_status: string;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          school_id?: string | null;
          team_id?: string | null;
          first_name: string;
          last_name: string;
          graduation_year: number;
          position: string;
          height?: string | null;
          jersey_number?: string | null;
          recruiting_status?: string;
          hometown?: string | null;
          instagram_handle?: string | null;
          profile_status?: string;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["athletes"]["Insert"]>;
        Relationships: [];
      };
      creators: {
        Row: BaseRow & {
          organization_id: string;
          user_profile_id: string | null;
          display_name: string;
          role: string;
          email: string;
          phone: string | null;
          home_market: string;
          rate_type: string;
          day_rate: number | null;
          status: string;
          specialties: string[];
          equipment: Json;
          rating: number | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          user_profile_id?: string | null;
          display_name: string;
          role: string;
          email: string;
          phone?: string | null;
          home_market: string;
          rate_type?: string;
          day_rate?: number | null;
          status?: string;
          specialties?: string[];
          equipment?: Json;
          rating?: number | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["creators"]["Insert"]>;
        Relationships: [];
      };
      assignments: {
        Row: BaseRow & {
          organization_id: string;
          event_id: string | null;
          creator_id: string | null;
          title: string;
          assignment_type: string;
          court: string | null;
          starts_at: string;
          ends_at: string;
          status: string;
          priority: string;
          shot_list: Json;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          event_id?: string | null;
          creator_id?: string | null;
          title: string;
          assignment_type: string;
          court?: string | null;
          starts_at: string;
          ends_at: string;
          status?: string;
          priority?: string;
          shot_list?: Json;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["assignments"]["Insert"]>;
        Relationships: [];
      };
      media_files: {
        Row: BaseRow & {
          organization_id: string;
          event_id: string | null;
          assignment_id: string | null;
          creator_id: string | null;
          athlete_id: string | null;
          sponsor_id: string | null;
          file_name: string;
          file_type: string;
          mime_type: string;
          r2_bucket: string | null;
          r2_key: string | null;
          original_filename: string | null;
          public_url: string | null;
          storage_key: string;
          storage_provider: string;
          size_bytes: number;
          file_size_bytes: number | null;
          duration_seconds: number | null;
          captured_at: string | null;
          uploaded_at: string;
          uploaded_by_user_id: string | null;
          download_count: number;
          processing_status: string;
          visibility: string;
          tags: string[];
          metadata: Json;
        };
        Insert: BaseInsert & {
          organization_id: string;
          event_id?: string | null;
          assignment_id?: string | null;
          creator_id?: string | null;
          athlete_id?: string | null;
          sponsor_id?: string | null;
          file_name: string;
          file_type: string;
          mime_type: string;
          r2_bucket?: string | null;
          r2_key?: string | null;
          original_filename?: string | null;
          public_url?: string | null;
          storage_key: string;
          storage_provider?: string;
          size_bytes?: number;
          file_size_bytes?: number | null;
          duration_seconds?: number | null;
          captured_at?: string | null;
          uploaded_at?: string;
          uploaded_by_user_id?: string | null;
          download_count?: number;
          processing_status?: string;
          visibility?: string;
          tags?: string[];
          metadata?: Json;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["media_files"]["Insert"]>;
        Relationships: [];
      };
      deliverables: {
        Row: BaseRow & {
          organization_id: string;
          event_id: string | null;
          sponsor_id: string | null;
          athlete_id: string | null;
          school_id: string | null;
          title: string;
          deliverable_type: string;
          due_at: string;
          status: string;
          priority: string;
          asset_count: number;
          owner_name: string | null;
          delivery_channel: string;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          event_id?: string | null;
          sponsor_id?: string | null;
          athlete_id?: string | null;
          school_id?: string | null;
          title: string;
          deliverable_type: string;
          due_at: string;
          status?: string;
          priority?: string;
          asset_count?: number;
          owner_name?: string | null;
          delivery_channel?: string;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["deliverables"]["Insert"]>;
        Relationships: [];
      };
      media_requests: {
        Row: BaseRow & {
          organization_id: string;
          requester_name: string;
          requester_email: string;
          requester_type: string;
          event_id: string | null;
          athlete_id: string | null;
          school_id: string | null;
          sponsor_id: string | null;
          title: string;
          description: string;
          request_type: string;
          status: string;
          priority: string;
          due_at: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          requester_name: string;
          requester_email: string;
          requester_type: string;
          event_id?: string | null;
          athlete_id?: string | null;
          school_id?: string | null;
          sponsor_id?: string | null;
          title: string;
          description: string;
          request_type: string;
          status?: string;
          priority?: string;
          due_at?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["media_requests"]["Insert"]>;
        Relationships: [];
      };
      sponsors: {
        Row: BaseRow & {
          organization_id: string;
          name: string;
          category: string;
          contact_name: string | null;
          contact_email: string | null;
          tier: string;
          contract_status: string;
          start_date: string | null;
          end_date: string | null;
          deliverables_due: number;
          notes: string | null;
        };
        Insert: BaseInsert & {
          organization_id: string;
          name: string;
          category: string;
          contact_name?: string | null;
          contact_email?: string | null;
          tier?: string;
          contract_status?: string;
          start_date?: string | null;
          end_date?: string | null;
          deliverables_due?: number;
          notes?: string | null;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["sponsors"]["Insert"]>;
        Relationships: [];
      };
      sponsor_assets: {
        Row: BaseRow & {
          organization_id: string;
          sponsor_id: string;
          name: string;
          asset_type: string;
          file_url: string | null;
          usage_rights: string;
          expires_at: string | null;
          status: string;
          metadata: Json;
        };
        Insert: BaseInsert & {
          organization_id: string;
          sponsor_id: string;
          name: string;
          asset_type: string;
          file_url?: string | null;
          usage_rights?: string;
          expires_at?: string | null;
          status?: string;
          metadata?: Json;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["sponsor_assets"]["Insert"]>;
        Relationships: [];
      };
      notifications: {
        Row: BaseRow & {
          organization_id: string;
          user_profile_id: string | null;
          title: string;
          body: string;
          notification_type: string;
          severity: string;
          read_at: string | null;
          action_url: string | null;
          metadata: Json;
        };
        Insert: BaseInsert & {
          organization_id: string;
          user_profile_id?: string | null;
          title: string;
          body: string;
          notification_type: string;
          severity?: string;
          read_at?: string | null;
          action_url?: string | null;
          metadata?: Json;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
        Relationships: [];
      };
      storage_usage: {
        Row: BaseRow & {
          organization_id: string;
          storage_provider: string;
          total_bytes: number;
          used_bytes: number;
          media_count: number;
          calculated_at: string;
        };
        Insert: BaseInsert & {
          organization_id: string;
          storage_provider?: string;
          total_bytes?: number;
          used_bytes?: number;
          media_count?: number;
          calculated_at?: string;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["storage_usage"]["Insert"]>;
        Relationships: [];
      };
      audit_logs: {
        Row: BaseRow & {
          organization_id: string;
          actor_user_profile_id: string | null;
          actor_clerk_user_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          metadata: Json;
        };
        Insert: BaseInsert & {
          organization_id: string;
          actor_user_profile_id?: string | null;
          actor_clerk_user_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          metadata?: Json;
        };
        Update: BaseUpdate & Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_clerk_user_id: {
        Args: Record<string, never>;
        Returns: string | null;
      };
      is_org_admin: {
        Args: { target_organization_id: string };
        Returns: boolean;
      };
      is_org_member: {
        Args: { target_organization_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      organization_role: OrganizationRole;
    };
    CompositeTypes: Record<string, never>;
  };
};
