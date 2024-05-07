import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

/* This function adds a new room to the database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

/* This function gets all room types from database */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong with fetching room types!");
  }
}

/*This function gets all the rooms from db*/
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error("Something went wrong while fetching all rooms!");
  }
}

/*This function deletes a room from db*/
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData);
  return response;
}
/* This function gets one room from db */
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`There was a problem while fetching room ${error.message}`);
  }
}

/* This function books a room */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data);
    } else {
      throw new Error(`Something went wrong while booking room! ${e.message}`);
    }
  }
}

/* This function gets all bookings from db */
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings");
    return result.data;
  } catch (e) {
    throw new Error(
      `Something went wrong while fetching bookings! ${e.message}`
    );
  }
}

/* This function gets booking by confirmation code from db */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data);
    } else {
      throw new Error(
        `Something went wrong while getting booking by confirmation code! ${e.message}`
      );
    }
  }
}

/* This function cancels or deletes a booking by bookingid from db */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.ata;
  } catch (error) {
    throw new Error(
      `Something went wrong while canceling the booking! ${error.message}`
    );
  }
}

/*This function gets all available rooms*/
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result;
}
