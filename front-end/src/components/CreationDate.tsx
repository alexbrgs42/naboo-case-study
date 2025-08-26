import { Text } from "@mantine/core";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";

interface CreationDateProps {
  createdAt: any;
}

export function CreationDate({ createdAt }: CreationDateProps) {
  const { user } = useAuth();
  const [shouldShowDate, setShouldShowDate] = useState(user?.role === 'admin');

  useEffect(() => {
    if (user && user?.role) {
      setShouldShowDate(user?.role === 'admin');
    }
  }, [user, user?.role]);
    
  return (
    <Text size="sm" color="dimmed">
      {shouldShowDate && (
      new Date(createdAt).toLocaleString()
      )}
    </Text>
  );
}