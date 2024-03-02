-- Insertion trigget
-- CREATE TRIGGER [dbo].[UniversityFundAllocationInsertTrigger] ON [dbo].[UniversityFundAllocation]
-- AFTER INSERT
-- AS
-- BEGIN
--   SET NOCOUNT ON;

--   DECLARE @BBDAllocationID INT
--   DECLARE @UniversityID INT
--   DECLARE @Budget Money

--   SELECT @BBDAllocationID = BBDAllocationID
--   FROM INSERTED
--   SELECT @UniversityID = UniversityID
--   FROM INSERTED
--   SELECT @Budget = Budget
--   FROM INSERTED

--   UPDATE BBDAllocation
--   SET RemainingBudget = RemainingBudget - @Budget
--   WHERE ID = @BBDAllocationID

--   UPDATE UniversityFundAllocation
--   SET RemainingBudget = RemainingBudget + @Budget
--   WHERE UniversityID = @UniversityID

-- Delete Trigger
-- CREATE TRIGGER [dbo].[UniversityFundAllocationDeleteTrigger] ON [dbo].[UniversityFundAllocation]
-- AFTER DELETE
-- AS
-- BEGIN
--   SET NOCOUNT ON;

--   DECLARE @BBDAllocationID INT
--   DECLARE @AllocatedAmount  Money
--   DECLARE @AmountUsed  Money

--   SELECT @BBDAllocationID = BBDAllocationID
--   FROM DELETED
--   SELECT @AllocatedAmount = Budget
--   FROM DELETED
--   SELECT @AmountUsed = AmountUsed
--   FROM DELETED

--   UPDATE BBDAllocation
--   SET AmountUsed = AmountUsed - (@AllocatedAmount - @AmountUsed)
--   WHERE ID = @BBDAllocationID

-- END


CREATE TRIGGER [dbo].[UniversityFundAllocationUpdateTrigger] ON [dbo].[UniversityFundAllocation]
INSTEAD OF UPDATE
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @BBDAllocationID INT
  DECLARE @Budget Money
  DECLARE @OldBudget Money
  DECLARE @UniversityAllocationID INT

  SELECT @BBDAllocationID = BBDAllocationID
  FROM INSERTED
  SELECT @Budget = Budget
  FROM INSERTED

  SELECT @OldBudget = Budget
  FROM DELETED
  SELECT @UniversityAllocationID = ID
  FROM DELETED

  IF (@Budget > @OldBudget)
  BEGIN
    UPDATE BBDAllocation
    SET AmountUsed = AmountUsed + (@Budget - @OldBudget)
    WHERE ID = @BBDAllocationID
  END
  ELSE IF (@Budget < @OldBudget)
  BEGIN
    UPDATE BBDAllocation
    SET AmountUsed = AmountUsed - (@OldBudget - @Budget)
    WHERE ID = @BBDAllocationID
  END

  UPDATE UniversityFundAllocation
  SET Budget = @Budget 
  WHERE ID = @UniversityAllocationID
END

