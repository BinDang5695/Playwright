import { test, expect } from '../../api/common/BaseTestApiBooking';
import CreateBookingSchema from '../../test_data/CreateBookingSchema.json';
import GetBookingSchema from '../../test_data/GetBookingSchema.json';
import UpdateBookingSchema from '../../test_data/UpdateBookingSchema.json';
import GetBookingAfterPatchSchema from '../../test_data/GetBookingAfterPatchSchema.json';
import { validateSchema } from '../../api/common/ApiTestHelper';
import { BookingService } from '../../api/booking/BookingService';
import { VerifyBookingHeaders } from '../../api/booking/VerifyBookingHeaders';
import { VerifyBookingResponseBody } from '../../api/booking/VerifyBookingResponseBody';
let createdBooking: any;
let createdBookingId: number;
let updatedBookingData: any;
test.describe.serial('API Booking Tests', () => {

  test('Post Booking', async ({ request, token }) => {
    const resultPost = await BookingService.post(request, token);
    validateSchema(CreateBookingSchema, resultPost.body);
    VerifyBookingHeaders.verify(resultPost.response);
    VerifyBookingResponseBody.verifyCreateBooking( resultPost.body, resultPost.requestData );
    expect(resultPost.body.bookingid).toBeGreaterThan(0);
    createdBooking = resultPost.body.booking;
    createdBookingId = resultPost.body.bookingid;
  });

  test('Get Booking', async ({ request, token }) => {
    const resultGet = await BookingService.get(request, token, createdBookingId);
    validateSchema(GetBookingSchema, resultGet.body);
    VerifyBookingHeaders.verify(resultGet.response);
    VerifyBookingResponseBody.verifyGetBooking(resultGet.body, createdBooking);
  });

  test('Patch Booking', async ({ request, token }) => {
    const resultPut = await BookingService.patch(request, token, createdBookingId);
    validateSchema(UpdateBookingSchema, resultPut.body);
    VerifyBookingHeaders.verify(resultPut.response);
    updatedBookingData = resultPut.requestData;
    const expectedBookingAfterPatch = { ...createdBooking, ...updatedBookingData };
    VerifyBookingResponseBody.verifyUpdatePartialBooking(resultPut.body, expectedBookingAfterPatch);
    createdBooking = expectedBookingAfterPatch;
  });

  test('Get Booking After Patch', async ({ request, token }) => {
    const resultGetAfterPut = await BookingService.get(request, token, createdBookingId);
    validateSchema(GetBookingAfterPatchSchema, resultGetAfterPut.body);
    VerifyBookingHeaders.verify(resultGetAfterPut.response);
    VerifyBookingResponseBody.verifyGetBooking(resultGetAfterPut.body, createdBooking);
  });

  test('Delete Booking', async ({ request, token }) => {
    const result = await BookingService.delete(request, token, createdBookingId);
    VerifyBookingHeaders.verifyText(result.response);
    VerifyBookingResponseBody.verifyDeleteBooking(result.body);
  });

  test('Get Booking After Delete', async ({ request, token }) => {
    const result = await BookingService.getAfterDelete(request, token, createdBookingId);
    VerifyBookingHeaders.verifyText(result.response);
    VerifyBookingResponseBody.verifyGetAfterDeleteBooking(result.body);
  });

});
