import { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card } from "./components/Card";

export default function SocialMediaApp() {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});

  const handleUpload = () => {
    if (!image) return;
    const newPhoto = { id: Date.now(), url: URL.createObjectURL(image), likes: 0, comments: [] };
    setPhotos(prev => [...prev, newPhoto]);
    setImage(null);
  };

  const handleLike = (id) => {
    setPhotos(prev => prev.map(photo => (photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo)));
  };

  const handleComment = (id) => {
    if (!commentsMap[id]) return;
    setPhotos(prev => prev.map(photo => 
      photo.id === id ? { ...photo, comments: [...photo.comments, commentsMap[id]] } : photo
    ));
    setCommentsMap(prev => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <Button onClick={handleUpload}>Upload</Button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="p-4">
            <img src={photo.url} alt="Uploaded" className="w-full rounded" />
            <Button onClick={() => handleLike(photo.id)}>❤️ {photo.likes}</Button>
            <div>
              <Input value={commentsMap[photo.id] || ""} onChange={(e) => setCommentsMap(prev => ({ ...prev, [photo.id]: e.target.value }))} placeholder="Add a comment" />
              <Button onClick={() => handleComment(photo.id)}>Comment</Button>
            </div>
            {photo.comments.map((c, index) => (
              <p key={index} className="text-sm">💬 {c}</p>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
