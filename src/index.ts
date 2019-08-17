import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export default <T>(resource: BehaviorSubject<T>) => {
  const [value, setValue] = useState(resource.getValue());
  useEffect(() => {
    const subscription = resource.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [resource]);
  return value;
};
