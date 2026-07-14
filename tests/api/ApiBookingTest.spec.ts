import { test, expect } from '@api/common/BaseTestApiBooking';
import CreateBookingSchema from '@data/api/CreateBookingSchema.json';
import GetBookingSchema from '@data/api/GetBookingSchema.json';
import UpdateBookingSchema from '@data/api/UpdateBookingSchema.json';
import GetBookingAfterPatchSchema from '@data/api/GetBookingAfterPatchSchema.json';
import { validateSchema } from '@api/common/ApiTestHelper';
import { BookingService } from '@api/booking/BookingService';
import { VerifyBookingHeaders } from '@api/booking/VerifyBookingHeaders';
import { VerifyBookingResponseBody } from '@api/booking/VerifyBookingResponseBody';

let createdBooking: any;
let createdBookingId: number;
let updatedBookingData: any;

test.describe.serial('API Booking Tests', () => {

    test('[BOOKING_001] Create Booking Successfully', async ({ request, token }) => {

        await test.step('Send POST request to create booking', async () => {
            const resultPost = await BookingService.post(request, token);

            await test.step('Validate response schema', async () => {
                validateSchema(CreateBookingSchema, resultPost.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyBookingHeaders.verify(resultPost.response);
            });

            await test.step('Verify created booking response body', async () => {
                VerifyBookingResponseBody.verifyCreateBooking(
                    resultPost.body,
                    resultPost.requestData
                );
            });

            await test.step('Save created booking information', async () => {
                expect(resultPost.body.bookingid).toBeGreaterThan(0);

                createdBooking = resultPost.body.booking;
                createdBookingId = resultPost.body.bookingid;
            });
        });

    });


    test('[BOOKING_002] Get Booking Successfully', async ({ request, token }) => {

        await test.step('Send GET request to get booking detail', async () => {
            const resultGet = await BookingService.get(
                request,
                token,
                createdBookingId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(GetBookingSchema, resultGet.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyBookingHeaders.verify(resultGet.response);
            });

            await test.step('Verify booking response body', async () => {
                VerifyBookingResponseBody.verifyGetBooking(
                    resultGet.body,
                    createdBooking
                );
            });
        });

    });


    test('[BOOKING_003] Update Booking Successfully', async ({ request, token }) => {

        await test.step('Send PATCH request to update booking', async () => {
            const resultPatch = await BookingService.patch(
                request,
                token,
                createdBookingId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(UpdateBookingSchema, resultPatch.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyBookingHeaders.verify(resultPatch.response);
            });

            await test.step('Verify updated booking response body', async () => {
                updatedBookingData = resultPatch.requestData;

                const expectedBookingAfterPatch = {
                    ...createdBooking,
                    ...updatedBookingData
                };

                VerifyBookingResponseBody.verifyUpdatePartialBooking(
                    resultPatch.body,
                    expectedBookingAfterPatch
                );

                createdBooking = expectedBookingAfterPatch;
            });
        });

    });


    test('[BOOKING_004] Get Booking After Update Successfully', async ({ request, token }) => {

        await test.step('Send GET request after update booking', async () => {
            const resultGetAfterPatch = await BookingService.get(
                request,
                token,
                createdBookingId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetBookingAfterPatchSchema,
                    resultGetAfterPatch.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyBookingHeaders.verify(resultGetAfterPatch.response);
            });

            await test.step('Verify updated booking data', async () => {
                VerifyBookingResponseBody.verifyGetBooking(
                    resultGetAfterPatch.body,
                    createdBooking
                );
            });
        });

    });


    test('[BOOKING_005] Delete Booking Successfully', async ({ request, token }) => {

        await test.step('Send DELETE request to remove booking', async () => {
            const result = await BookingService.delete(
                request,
                token,
                createdBookingId
            );

            await test.step('Verify delete response header', async () => {
                VerifyBookingHeaders.verifyText(result.response);
            });

            await test.step('Verify delete response body', async () => {
                VerifyBookingResponseBody.verifyDeleteBooking(result.body);
            });
        });

    });


    test('[BOOKING_006] Get Booking After Delete Successfully', async ({ request, token }) => {

        await test.step('Send GET request after deleting booking', async () => {
            const result = await BookingService.getAfterDelete(
                request,
                token,
                createdBookingId
            );

            await test.step('Verify response header', async () => {
                VerifyBookingHeaders.verifyText(result.response);
            });

            await test.step('Verify booking not found response', async () => {
                VerifyBookingResponseBody.verifyGetAfterDeleteBooking(
                    result.body
                );
            });
        });

    });

});