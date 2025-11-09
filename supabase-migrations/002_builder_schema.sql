-- AI App Builder Schema

-- Apps table
CREATE TABLE IF NOT EXISTS apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  schema JSONB NOT NULL DEFAULT '{"pages":[],"dataModels":[],"workflows":[],"settings":{}}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  preview_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Commands history
CREATE TABLE IF NOT EXISTS ai_commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  intent TEXT,
  response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')),
  invited_by UUID NOT NULL REFERENCES auth.users(id),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- Deployments
CREATE TABLE IF NOT EXISTS deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  environment TEXT NOT NULL CHECK (environment IN ('preview', 'production')),
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('building', 'ready', 'failed')),
  build_log JSONB,
  deployed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  preview_image TEXT,
  schema JSONB NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_apps_user_id ON apps(user_id);
CREATE INDEX idx_apps_status ON apps(status);
CREATE INDEX idx_ai_commands_app_id ON ai_commands(app_id);
CREATE INDEX idx_team_members_app_id ON team_members(app_id);
CREATE INDEX idx_deployments_app_id ON deployments(app_id);
CREATE INDEX idx_analytics_events_app_id ON analytics_events(app_id);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- Row Level Security
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies for apps
CREATE POLICY "Users can view their own apps"
  ON apps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own apps"
  ON apps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own apps"
  ON apps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own apps"
  ON apps FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for ai_commands
CREATE POLICY "Users can view commands for their apps"
  ON ai_commands FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = ai_commands.app_id AND apps.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create commands for their apps"
  ON ai_commands FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = app_id AND apps.user_id = auth.uid()
    )
  );

-- Policies for team_members
CREATE POLICY "Users can view team members for their apps"
  ON team_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = team_members.app_id AND apps.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage team members for their apps"
  ON team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = team_members.app_id AND apps.user_id = auth.uid()
    )
  );

-- Policies for deployments
CREATE POLICY "Users can view deployments for their apps"
  ON deployments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = deployments.app_id AND apps.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create deployments for their apps"
  ON deployments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = app_id AND apps.user_id = auth.uid()
    )
  );

-- Policies for templates (public read)
CREATE POLICY "Anyone can view templates"
  ON templates FOR SELECT
  USING (true);

-- Policies for analytics
CREATE POLICY "Users can view analytics for their apps"
  ON analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM apps WHERE apps.id = analytics_events.app_id AND apps.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for apps
CREATE TRIGGER update_apps_updated_at
  BEFORE UPDATE ON apps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
