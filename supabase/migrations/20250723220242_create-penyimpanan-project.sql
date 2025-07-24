
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN video_url text DEFAULT '';
  END IF;
END $$;

-- Drop existing policy and recreate with video support
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;

-- Create new policy that supports both images and videos
CREATE POLICY "Authenticated users can upload project files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'projects' AND (storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png', 'mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv'])));